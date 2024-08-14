package com.java.ems.service;

import com.java.ems.dto.EmployeeDto;
import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeId);
}

