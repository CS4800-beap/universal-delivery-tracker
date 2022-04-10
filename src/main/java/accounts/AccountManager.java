package accounts;

import jdbc.SpringJDBCConfig;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;

public class AccountManager {
    private static AccountManager accountManager;

    private AccountManager(){

    }

    public static AccountManager getAccountManager(){
        if(accountManager == null){
            accountManager = new AccountManager();
        }

        return accountManager;
    }

    public boolean createNewAccount(String username, String email, String pwd, String fname, String lname){
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());

        String sql = "INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?);";

        try {
            int result = jdbcTemplate.update(sql, username, email, pwd, fname, lname);
            return result > 0;
        } catch (DuplicateKeyException e) {
            System.out.println("userid/ email already exists. please try a different combination.");
            return false;
        }
    }

    public UserAccount login(String email, String pwd) throws Exception{
        String sql = "SELECT * FROM users WHERE email = \"" + email + "\";";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(SpringJDBCConfig.getMysqlDataSource());
        List<UserAccount> accounts = jdbcTemplate.query(sql, new UserAccountMapper());
        if(accounts.size() <= 0){
            throw new Exception("user not found");
        }
        boolean loggedIn = accounts.get(0).checkPassword(pwd);

        if(loggedIn){
            System.out.println("User " + email + " logged in successfully.");
        }
        else{
            System.out.println("Login attempt failed.");
        }

        return accounts.get(0);
    }

    public List<String> getTrackingNumbers(String token){
        String sql = "";
        return null;
    }

    public boolean addTrackingNumber(){

        return false;
    }
}
