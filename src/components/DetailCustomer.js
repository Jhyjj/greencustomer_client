import React, { useEffect, useReducer } from 'react';
import {TableBody, Table, TableCell, TableRow} from "@mui/material";
import {useParams} from 'react-router-dom';
import axios from 'axios'; //axios는 그 자체가 객체기때문에 중괄호 아님~~~!!!!!!!!

const initialState = {
    loading: false,
    data: null,
    error : null
}

//리듀서 함수
function reducer(state,action){
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                data : null,
                error: null
            }
        case "SUCCESS":
            return{
                loading: false,
                data : action.data,
                error : null
            }
        case "ERROR" :
            return{
                loading:false,
                data: null,
                error: action.error
            }
        default:
            return state;
    }
}


const DetailCustomer = () => {

    const {id} = useParams();
    console.log(id); 

    const fetchDetailview = async ()=>{
        dispatch({type:"LOADING"});
        try{
            const res = await axios.get(`http://localhost:3001/detailview/${id}`);
            dispatch({type:"SUCCESS", data: res.data})
        }
        catch(e){
            console.log(e);
            dispatch({type:"ERROR",error:e})
        }
    }
    useEffect(()=>{fetchDetailview()},[]);

    const [state, dispatch] = useReducer(reducer,initialState);
    const {loading, data, error} = state;
    console.log(data);

    if(loading) return <div>로딩중~~~</div>
    if(error) return <div>에러..</div>
    if(!data) return <div>데이터를 받아오지못함</div>
    
    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>고객명</TableCell>
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{data.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{data.birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{data.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{data.add1}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default DetailCustomer;