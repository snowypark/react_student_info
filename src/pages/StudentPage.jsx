import React, { useRef, useState, useEffect } from 'react';
import StudentInfo from '../components/StudentInfo';
import InfoInput from '../components/InfoInput'; 
import { useEffect } from 'react';


function StudentPage() {

  const studentObj = {
    name: "",
    age: "",
    address: ""

  }

  const [student, setStudent ] = useState(studentObj);

  const [inputValues, setInputValues] = useState(studentObj);
  const [refresh, setRefresh] = useState(false);  

  const inputRef = {
    name: useRef(),
    age: useRef(),
    address:useRef()
  }

  useEffect(() => {
    console.log(inputRef.name.current);
  }, []);

  useEffect(() => 
    console.log(inputRef.age.current)
  , []);

  useEffect(() => {
    console.log(inputRef.address.current);
  }, []);

  //처음 한번 실행됨
  useEffect(() => {
    if(refresh) {
      setInputValues(studentObj);

    }
    setRefresh(true);
  }, [student]);

  const handleInputChange = (e) => {
      const {name, value } = e.target;
      
      setInputValues({
      ...inputValues,
      [name]: value
      });
  }
  let email = "email";
  let phone = "01234567";

  let user = {
    "username": "test",
    ["password"]: "1234",
    email: "test",
    phone
  }
    /** 
     * js객체 특징
     * 1. 키값은 문자열이어도 된다.
     * 2. 변수의 문자열 값을 키값으로 쓰고 싶을 때 []대괄호로
     *    묶어서 참조할 수 있다.
     * 3. 변수명만 입력하면 객체의 속성과 value로 한번에 정의할 수 있다.
    */

   const handleOnOK = () => {
    setStudent(inputValues);
  }

  const handleOnClean = () => {
    setStudent(studentObj);
    
  }

  return (
    <>

      <StudentInfo title="이름" text={student.name}/>
      <StudentInfo title="나이" text={student.age}/>
      <StudentInfo title="주소" text={student.address} />

      <InfoInput
        name={"name"}
        onChange={handleInputChange}
        value={inputValues.name}
        placeholder={"이름"}
        inputRef={inputRef.name}
      />

      <InfoInput
        name={"age"}
        onChange={handleInputChange}
        value={inputValues.age}
        placeholder={"나이"}
        inputRef={inputRef.age}
      />

      <InfoInput
        name={"address"}
        onChange={handleInputChange}
        value={inputValues.address}
        placeholder={"주소"}
        inputRef={inputRef.address}
      />

      {/* <input type="text" 
        name='name' onChange={handleInputChange} 
        value={inputValues.name} 
        placeholder='이름' /> */}

      
      <InfoButtons>
        <button onClick={handleOnOK}>확인</button>
        <button onClick={handleOnClean}>비우기</button>
      </InfoButtons>

    </>
  );
}
export default StudentPage;