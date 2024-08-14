package com.java.ems.service.impl;

import com.java.ems.dto.EmployeeDto;
import com.java.ems.entity.Employee;
import com.java.ems.exception.ResourceNotFoundException;
import com.java.ems.mapper.EmployeeMapper;
import com.java.ems.repository.EmployeeRepository;
import com.java.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=  employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employId) {
        Employee employee= employeeRepository.findById(employId).
                orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist with the given id:"+employId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {

        List<Employee>employees=employeeRepository.findAll();


        return employees.stream().map(EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->
                new ResourceNotFoundException("Employee is not exist with the given id:"+employeeId));

        employee.setFirstname(updatedEmployee.getFirstname());
        employee.setLastname(updatedEmployee.getLastname());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj=employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee=employeeRepository.findById(employeeId).orElseThrow(()->
                new ResourceNotFoundException("Employee is not exist with the given id:"+employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
