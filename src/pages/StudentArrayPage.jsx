import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage() {

    const [ studentList, setStudentList ] = useState([]);
    const [ inputValue, setInputValue ] = useState({
        id: "",
        name: "",
        age: "",
        address: ""
    });

    const [ updateId, setUpdateId ] =  useState(0);
    
    const staticId = useRef(0);
        // staticId.current 값이 변해도 렌더링 x
        // 재렌더링이 발생해도 초기화되지 않음
    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    const handlAddClick = () => {
        
        const student = {
            ...inputValue,
            id: staticId.current += 1
        };

        setStudentList([...studentList, student]);
    }

    useEffect(() => {
        console.log(studentList);

    }, [studentList]);

    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id !== id)]);
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]);
    }

    //수정버튼 클릭
    const handlUpdateSumbitClick = (id) => {
        const findIndex = studentList.indexOf(studentList.filter(student => student.id === updateId)[0]);
        const updateStudentList = [...studentList]; //새로운 배열(기존 studentList 수정 X) useState 변수 수정X
        updateStudentList[findIndex] = inputValue;

        setStudentList(updateStudentList);
        handleCancelClick();

    }

    const handleCancelClick = () => {
        setUpdateId(0);
        setInputValue({
            id: "",
            name: "",
            age: "",
            address: ""
        });
    }

    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID'/>
                <input type="text" name='name' onChange={handleInputChange} placeholder='이름' value={inputValue.name}/>
                <input type="text" name='age' onChange={handleInputChange} placeholder='나이' value={inputValue.age}/>
                <input type="text" name='address' onChange={handleInputChange} placeholder='주소' value={inputValue.address}/>
                <button onClick={handlAddClick}>추가</button>
            </div>
            <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                {studentList.map(student => {
                    return <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                        <td>
                            {
                                updateId !== student.id
                                ? <button onClick={() => {handleUpdateClick(student.id);}}>수정</button>
                                : <button onClick={handlUpdateSumbitClick}>확인</button>
                            }
                        </td>
                        <td>
                            {
                                updateId !== student.id
                                ? <button onClick={() => {handleDeleteClick(student.id);}}>삭제</button>
                                : <button onClick={handleCancelClick}>취소</button>

                            }
                        </td>
                    </tr>
                })}

            </tbody>                    
            </table>
        </div>
    );
}

export default StudentArrayPage;