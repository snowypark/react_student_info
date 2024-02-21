import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';

function StudnetArrayPage2(props) {

    // 이름, 점수
    // 총점, 평균 .toFixed(2)

    const [ studentList, setStudentList ] = useState([]);
    const [inputValue, setInputValue ] = useState({
        id: "",
        name: "",
        score: ""
    });

    const student = {
        id: 0,
        name: "",
        score: 0
    }

    const [scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0,
        max: 0
    });


    const scoreTotal = () => {
        let total = 0;
        studentList.map(student => {        
            total += parseInt(student.score);
        });
        return total;
    };

    useEffect(() => {
        const total = scoreTotal();
        setScoreData(oldScore => ({
            ...oldScore,
            total: total
        }));
    }, [studentList]);

    const scoreAvg = () => {
        let avgCount = 0;
        let sum = 0;
        let avg = 0;
        studentList.map(student => {
            sum += parseInt(student.score);
            avgCount = studentList.length;
            avg = sum / avgCount;
        });
        return avg.toFixed(2);
    }

    useEffect(() => {
        const avg = scoreAvg();
        setScoreData(oldScore => ({
            ...oldScore,
            avg: avg
        }));
    }, [studentList]);

    const scoreMax = () => {
        let max = 0;
        studentList.map(student => {
            max = Math.max(student.score);
        });
        return max;
    }

    useEffect(() => {
        const max = scoreMax();
        setScoreData(oldScore => ({
            ...oldScore,
            max: max
        }));
        
    }, [studentList]);


    const staticId = useRef(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    const handleAddClick = () => {        
        const student = {
            ...inputValue,
            id: staticId.current += 1
        };
        setStudentList([...studentList, student]);

    }

    const [ updateId, setUpdateId ] =  useState(0);
    
    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]);
    }
    
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

    useEffect(() => {
        console.log(studentList);

    }, [studentList]);

    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id !== id)]);
    }


    return (
        <div>
            <div>
                <input type="text" name='id'  placeholder='Id' value={inputValue.id} disabled={true} />
                <input type="text" name='name' onChange={handleInputChange} placeholder='이름' value={inputValue.name}/>
                <input type="text" name='score' onChange={handleInputChange} placeholder='점수'value={inputValue.score}/>
                <button onClick={handleAddClick}>추가</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                {studentList.map(student => {
                    return <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.score}</td>
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
                <tfoot>
                <tr>
                        <th>총점</th>
                        <th colSpan={2}>                         
                            {scoreData.total}
                        </th>
                    </tr>
                    <tr>
                        <th>평균</th>
                        <th colSpan={2}>
                            {scoreData.avg}
                        </th>
                    </tr>
                        <tr>
                            <th> 최대값  </th>
                            <th colSpan={2}>
                                {scoreData.max}
                            </th>
                        </tr>

                </tfoot>
            </table>
            
        </div>
    );
}

export default StudnetArrayPage2;