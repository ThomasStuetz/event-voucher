package at.htlleonding.voucher.user;

import at.htlleonding.voucher.entity.Voucher;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.Set;


@Entity
@Table(name = "ev_user")
public class User extends PanacheEntity {

    public String login;
    public String email;
    public String password; // Use e.g Bcrypt to encrypt password, don't store it as plain text :)


    public User() {
    }

    public User(String login, String email, String password) {
        this.login = login;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
