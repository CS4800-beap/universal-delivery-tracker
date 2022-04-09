package edu.cpp.beap.universaldeliverytracker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.baeldung.jdbc")
public class SpringJDBCConfig {

    private static DriverManagerDataSource dataSource = null;

    public SpringJDBCConfig(){

    }

    private static void establishConnection(){
        dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://beapdb-instance-1.cgfusvr9kj7y.us-east-1.rds.amazonaws.com/BEAP");
        dataSource.setUsername("beapadmin");
        dataSource.setPassword("Zv-#9{M>6x");
    }

    @Bean
    public static DataSource getMysqlDataSource() {
        if(dataSource == null){
            establishConnection();
        }
        return dataSource;
    }
}
