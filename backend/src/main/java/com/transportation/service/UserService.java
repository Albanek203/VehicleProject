package com.transportation.service;

import com.transportation.dto.UserDto;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final Mapper mapper;

    public Page<UserDto> getAll(Long id, String name, String surname, String email, Pageable pageable) {
        return userRepository.findAllBy(id, name, surname, email, pageable).map(mapper::toUserDto);
    }

    public UserDto get(Long id) {
        return mapper.toUserDto(retrieve(id));
    }

    public UserDto create(UserDto dto) {
        User User = userRepository.save(mapper.toUser(dto));
        return mapper.toUserDto(User);
    }

    public UserDto update(Long id, UserDto dto) {
        User User = retrieve(id);
        mapper.mergeUser(dto, User);
        return mapper.toUserDto(userRepository.save(User));
    }

    public void delete(Long id) { userRepository.deleteById(id); }

    private User retrieve(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User", id));
    }
}
