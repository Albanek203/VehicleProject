package com.transportation.configuration;

import com.transportation.security.DatabaseUserService;
import com.transportation.security.JsonAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfiguration {
    private final DatabaseUserService databaseUserService;
    private final AuthenticationSuccessHandler authenticationSuccess;
    private final AuthenticationFailureHandler authenticationFailure;
    private final LogoutSuccessHandler logoutSuccess;
    private final AuthenticationEntryPoint authenticationFailEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .antMatchers("/api/auth/login").permitAll()
                .antMatchers("/api/auth/logout").permitAll()
                .antMatchers("/api/auth/signup").permitAll()
                .antMatchers("/api/delivery").permitAll()
                // TODO: Uncomment when security will be implemented
                .antMatchers("/api/**").authenticated());

        http.csrf().disable()
                .cors()
                .and()
                .exceptionHandling()
             /*   .authenticationEntryPoint(authenticationFailEntryPoint)*/
                .and()
                .logout().logoutUrl("/api/auth/logout").logoutSuccessHandler(logoutSuccess)
                .and()
                .sessionManagement().maximumSessions(1);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(databaseUserService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public JsonAuthenticationFilter authenticationFilter() {
        JsonAuthenticationFilter jsonAuthenticationFilter = new JsonAuthenticationFilter();
        jsonAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccess);
        jsonAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailure);
        jsonAuthenticationFilter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/auth/login"));
        jsonAuthenticationFilter.setAuthenticationManager(authenticationManager());
        return jsonAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authProvider());
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers("/swagger", "/swagger-ui/**", "/v3/**");
    }
}
