
package com.shahroz.contactbackend.Service;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Userrepository;
import com.shahroz.contactbackend.Services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)

// Main class
class UserServiceTest {

    @Mock
    private Userrepository userrepository;
    //When using Mockito Use @InjectMocks to inject
//Mocked beans to following class
    @InjectMocks
    private UserService userService;

    @Test
    void getAllUser()
    {
        //given
        User user= new User(45l,"Shahroz@123.com","1234","Shahroz","Salman","asd","0321","-");
        User user2= new User(46l,"Shahroz@123.com2","12342","Shahroz2","Salman2","asd","0331","-");

        //When
        given(userrepository.findAll())
                .willReturn(List.of(user,user2));
        var personList = userService.getUsers();
        //Then
        //Make sure to import assertThat From org.assertj.core.api package
        assertThat(personList).isNotNull();
        assertThat(personList.size()).isEqualTo(2);
    }

    @Test
    void findByIdandSave() {
        // given
        User user = new User(47L, "Shahroz@123.com", "1234", "Shahroz", "Salman", "asd", "0321", "-");

        // when
        given(userrepository.save(user)).willReturn(user);
        given(userrepository.findById(47L)).willReturn(Optional.of(user));
        User savedUser = userService.save(user);
        User user2 = userService.findById(47L);

        // then
        assertThat(user2).isNotNull();
        assertThat(user2).isEqualTo(savedUser);
    }

    @Test
    void findByPhoneNumber() {
        // given
        String phonenumber = "0123456";
        User user = new User(48L, "Shahroz@123.com3", "1234", "Shahroz", "Salman", "asd", phonenumber, "-");

        // when
        given(userrepository.save(user)).willReturn(user);
        given(userrepository.findByPhoneNumber(phonenumber)).willReturn(Optional.of(user));

        // First, save the user
        userService.save(user);

        // Then, retrieve by phone number
        User foundUser = userService.getUserFromPhoneNumber(phonenumber);


        // then
        assertThat(foundUser).isNotNull();
        assertThat(foundUser).isEqualTo(user);
    }





}

