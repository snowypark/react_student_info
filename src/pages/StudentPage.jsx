import React, { useEffect, useRef, useState } from 'react';
import StudentInfo from '../components/StudentInfo';
import InfoInput from '../components/InfoInput';
import InfoButtons from '../components/InfoButtons';

function StudentPage(props) {
    const studentObj = {
        name: "",
        age: "",
        address: ""
      };
    
      const [ student, setStudent ] = useState(studentObj);
      const [ inputValues, setInputValues ] = useState(studentObj);
    
      const inputRef = {
        name: useRef(),
        age: useRef(),
        address: useRef()
      }
    
      useEffect(() => {
        console.log(inputRef.name.current);
      }, [])
    
      useEffect(() => {
        setInputValues(studentObj);
      }, [student]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setInputValues({
          ...inputValues,
          [name]: value
        });
      }
    
      const handleOnOk = () => {
        setStudent(inputValues);
      }
    
      const handleOnClean = () => {
        setStudent(studentObj);
      }
    
      return (
        <>
          <StudentInfo title="이름" text={student.name} />
          <StudentInfo title="나이" text={student.age} />
          <StudentInfo title="주소" text={student.address} />
    
          <InfoInput 
            name={"name"} 
            onChange={handleInputChange}
            value={inputValues.name} 
            placeholder='이름'
            inputRef={inputRef.name}
          />
    
          <InfoInput 
            name={"age"} 
            onChange={handleInputChange}
            value={inputValues.age} 
            placeholder='나이'
            inputRef={inputRef.age}
          />
    
          <InfoInput 
            name={"address"} 
            onChange={handleInputChange}
            value={inputValues.address} 
            placeholder='주소'
            inputRef={inputRef.address}
          />
    
          <InfoButtons>
            <button onClick={handleOnOk}>확인</button>
            <button onClick={handleOnClean}>비우기</button>
          </InfoButtons>
        </>
      );
}

export default StudentPage;