import React, {useState, useEffect, useReducer} from 'react';
import {TableRow, TableCell} from '@mui/material';
import {Link} from 'react-router-dom';
import axios from 'axios';

//초기값 작성하기
const initialState = {
    loading: false,
    data: null,
    error: null 
}

//리듀서 함수 작성하기
function reducer(state, action){
    switch(action.type){
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null
            }
        case "SUCCESS":
            return{
                loading: false,
                data:action.data,
                error:null
            }
        case "ERROR":
            return{
                loading: false,
                data: null,
                error:action.error
            }
        default:
            return state;
    }
}

const Customer = () => {

    const fetchCustomer = async ()=>{
        dispatch({type:"LOADING"});
        try{
            const response = await axios.get("http://localhost:3001/customers");
            dispatch({type:"SUCCESS", data: response.data})
        }
        catch(e){
            dispatch({type:"ERROR",error:e})
            console.log(e);
        }
    }
    useEffect(()=>{fetchCustomer()},[]);


    const [state,dispatch]=useReducer(reducer,initialState);
    const {loading, data, error} = state;

    if(loading) return <div>로딩중입니다..</div>
    if(error) return <div>에러발생</div>
    if(!data) return <div>데이터를 받아오지 못했음..</div>
    return (
        data.map(customer=>(
        <TableRow>
                <TableCell>{customer.no}</TableCell>
                <TableCell><Link to={`/detailview/${customer.no}`}>{customer.name}</Link></TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.birth}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{customer.add1}</TableCell>
            </TableRow>

    ))
            
            
    );
};

export default Customer;