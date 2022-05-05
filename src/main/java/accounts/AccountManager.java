package accounts;

import exceptions.AccountExceptions.InvalidIDException;
import exceptions.TokenExceptions.TokenExpiredException;
import io.jsonwebtoken.Jwt;
import jdbc.SpringJDBCConfig;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import tokens.JwtTokenUtil;

import java.util.List;

public class AccountManager {
    private static AccountManager accountManager;

    //Singleton Class
    private AccountManager(){

    }

    public static AccountManager getAccountManager(){
        if(accountManager == null){
            accountManager = new AccountManager();
        }

        return accountManager;
    }

    //Creates a new account, catches DuplicateKeyException if account already exists
    public boolean createNewAccount(String username, String email, String pwd, String fname, String lname) throws DuplicateKeyException{
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());

        String sql = "INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?);";

        int result = jdbcTemplate.update(sql, username, email, pwd, fname, lname);
        return result > 0;
    }

    public String login(String email, String pwd) throws InvalidIDException{
        String sql = "SELECT * FROM users WHERE email = \"" + email + "\";";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());
        List<UserAccount> accounts = jdbcTemplate.query(sql, new UserAccountMapper());

        if(accounts.size() <= 0){
            throw new InvalidIDException("User Not Found");
        }

        boolean loggedIn = accounts.get(0).checkPassword(pwd);
        if(!loggedIn){
            return "Incorrect Password";
        }
        else{
            JwtTokenUtil tokens = new JwtTokenUtil();
            return tokens.generateToken(accounts.get(0));
        }
    }

    public List<String> getTrackingNumbers(String token) throws TokenExpiredException, InvalidIDException{
        validateToken(token);
        String identifier = getUserFromToken(token);
        validateUserID(identifier);

        String sql = "SELECT * FROM tracking_numbers WHERE username = \"" + identifier + "\";";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());
        List<String> trackingNumbers = jdbcTemplate.query(sql, new TrackingNumbersMapper());

        return trackingNumbers;
    }

    public boolean addTrackingNumber(String token, String trackingNumber, String nickname, String courier) throws InvalidIDException, TokenExpiredException {
        validateToken(token);
        String identifier = getUserFromToken(token);
        validateUserID(identifier);

        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());
        String sql = "SELECT * FROM tracking_numbers WHERE username = \"" + identifier + "\" AND tracking;";
        List<String> trackingNumbers = jdbcTemplate.query(sql, new TrackingNumbersMapper());

        if(trackingNumbers.size() == 0){
            sql = "INSERT INTO tracking_numbers (username, tracking_numberscol, nickname, courier) VALUES (?, ?, ?, ?);";
            int result = jdbcTemplate.update(sql, identifier, trackingNumber, nickname, courier);
            return result > 0;
        }
        else {
            return false;
        }
    }

    private String getUserFromToken(String token){
        JwtTokenUtil jtu = new JwtTokenUtil();
        return jtu.getUsernameFromToken(token);
    }

    public boolean validateToken(String token) throws TokenExpiredException{
        JwtTokenUtil jtu = new JwtTokenUtil();

        if (!jtu.validateToken(token))
            throw new TokenExpiredException();

        return true;
    }

    private boolean validateUserID(String ID) throws InvalidIDException{
        String sql = "SELECT * FROM users WHERE email = \"" + ID + "\";";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());
        List<UserAccount> accounts = jdbcTemplate.query(sql, new UserAccountMapper());

        if (accounts.size() == 0)
            throw new InvalidIDException("Invalid Username");

        return true;
    }
}
