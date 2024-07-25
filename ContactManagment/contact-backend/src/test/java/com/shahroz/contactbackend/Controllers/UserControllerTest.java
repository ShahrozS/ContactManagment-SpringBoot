package com.shahroz.contactbackend.Controllers;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setUser_id(1L);
        user.setEmail("test@example.com");
        user.setPassword(new BCryptPasswordEncoder().encode("password"));
    }

    @Test
    void getAllUsers() {
        List<User> users = Arrays.asList(user);
        when(userService.getUsers()).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }

    @Test
    void getUserById() {
        when(userService.findById(anyLong())).thenReturn(user);

        ResponseEntity<User> response = userController.getUserById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void checkPassword() {
        when(userService.findById(anyLong())).thenReturn(user);

        ResponseEntity<String> response = userController.checkPassword("password", 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("True", response.getBody());
    }

    @Test
    void updatePassword() {
        when(userService.updatePassword(anyLong(), anyString())).thenReturn(true);

        ResponseEntity<String> response = userController.updatePassword("newPassword", 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("True", response.getBody());
    }

    @Test
    void findByEmail() {
        when(userService.findByEmail(anyString())).thenReturn(user);

        ResponseEntity<User> response = userController.findByEmail("test@example.com");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void getUserByName() {
        List<User> users = Arrays.asList(user);
        when(userService.findByName(anyString())).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getUserByName("test");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }

    @Test
    void updateUser() {
        when(userService.updateUser(anyLong(), any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userController.updateUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }


}
