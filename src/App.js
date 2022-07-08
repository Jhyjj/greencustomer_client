
import './App.css';
import CustomerList from './components/CustomerList';
import DetailCustomer from './components/DetailCustomer';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';

// const customers = [
//   {
//     no: 1,
//     name: "김멍멍",
//     phone: "01012345678",
//     birth: "19920206",
//     gender: "여성",
//     add: "울산 남구"
//   },
//   {
//     no: 2,
//     name: "이멍멍",
//     phone: "01098765432",
//     birth: "20020709",
//     gender: "여성",
//     add: "울산 동구"
//   },
//   {
//     no: 3,
//     name: "박멍멍",
//     phone: "01011112222",
//     birth: "19840506",
//     gender: "여성",
//     add: "울산 북구"
//   }
// ]

function App() {
  return (

    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<CustomerList />}/>
        <Route path='/detailview/:id' element={<DetailCustomer/>}/>
        <Route path='/write' element={<CreateCustomer/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;
