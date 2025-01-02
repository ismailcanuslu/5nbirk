package com.blog._nbirk.mail;

import com.blog._nbirk.configuration.AppProperties;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

@Service
public class EmailService {
    JavaMailSenderImpl mailSender;

    @Autowired
    AppProperties appProperties;

    @Autowired
    ResourceLoader resourceLoader;

    String activationMail;
    String forgotPasswordMail;
    String passwordChangedMail;

    @PostConstruct
    public void initialize(){
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost(appProperties.getEmail().host());
        mailSender.setPort(appProperties.getEmail().port());
        mailSender.setUsername(appProperties.getEmail().username());
        mailSender.setPassword(appProperties.getEmail().password());

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable",true);

        this.activationMail = loadMailTemplate("activation-mail.html");
        this.forgotPasswordMail = loadMailTemplate("forgot-password-mail.html");
        this.passwordChangedMail = loadMailTemplate("password-changed-mail.html");
    }

    public String loadMailTemplate(String templateName) {
        try {
            Resource resource = resourceLoader.getResource("classpath:templates/" + templateName);

            return Files.readString(Paths.get(resource.getURI()), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error loading mail template", e);
        }
    }

    public void sendActivationMail(String email, String activationToken, String username) throws MessagingException {
        var activationUrl = appProperties.getClient().host() + "/activation/" + activationToken;
        var mailBody = activationMail.replace("${url}",activationUrl).replace("${username}", username);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());
        try {
            message.setFrom(appProperties.getEmail().from());
            message.setTo(email);
            message.setSubject("E-Posta adresini onayla");
            message.setText(mailBody,true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        this.mailSender.send(mimeMessage);
    }

    public void sendForgotPasswordEmail(String email, String passwordResetToken, String username) throws MessagingException{
        var forgotPasswordUrl = appProperties.getClient().host() + "/forgot-password/" + passwordResetToken;
        var mailBody = forgotPasswordMail.replace("${url}",forgotPasswordUrl).replace("${username}",username);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,StandardCharsets.UTF_8.name());

        try{
            message.setFrom(appProperties.getEmail().from());
            message.setTo(email);
            message.setSubject("Şifreni sıfırla");
            message.setText(mailBody,true);
        }catch (MessagingException e){
            throw new RuntimeException(e);
        }
        this.mailSender.send(mimeMessage);

    }
    public void sendPasswordChangedMail(String email, String username) throws MessagingException{
        var mailBody = passwordChangedMail.replace("${username}",username);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,StandardCharsets.UTF_8.name());

        try{
            message.setFrom(appProperties.getEmail().from());
            message.setTo(email);
            message.setSubject("Şifreni değiştirdik");
            message.setText(mailBody,true);
        }catch (MessagingException e){
            throw new RuntimeException(e);
        }
        this.mailSender.send(mimeMessage);
    }
}
