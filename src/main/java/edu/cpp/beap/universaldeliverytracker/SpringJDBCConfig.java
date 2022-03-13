package edu.cpp.beap.universaldeliverytracker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.baeldung.jdbc")
public class SpringJDBCConfig {
    @Bean
    public DataSource mysqlDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("test-db-beap.cluster-cgfusvr9kj7y.us-east-1.rds.amazonaws.com");
        dataSource.setUsername("beap_admin");
        dataSource.setPassword("tkPE^q^ZulD$");

        return dataSource;
    }
}
