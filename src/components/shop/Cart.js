import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { pay } from './Pay';
import { useNavigate } from 'react-router-dom';

const CartWrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto 40px auto;
  padding: 20px 0;
  position: relative;
  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 25px;
  }
  thead {
    border: 1px solid #ddd;
  }

  thead tr th {
    font-weight: bold;
    color: #222;
    text-align: center;
  }
  tbody {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  tbody .count {
    border: none;
    padding: 0px 5px;
    border-radius: 5px;
    margin: 0px 5px;
    background-color: #dbdbdb;
  }
  tbody .delete-btn {
    border: 1px solid #666;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    background-color: #fff;
    color: #666;
    box-sizing: border-box;
  }
  tbody .delete-btn:hover {
    border: 1px solid #68a6fe;
    background-color: #68a6fe;
    color: #fff;
  }
  tbody tr td {
    text-align: center;
  }
  tbody .total {
    text-align: center;
  }
  .payBtn {
    width: 10rem;
    height: 2.5rem;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    background-color: #68a6fe;
    position: absolute;
    right: 0px;
  }
  .payBtn:hover {
    background-color: #5396f5;
  }
`;

function Cart(props) {
  const [ cartList, setCartList ] = useState([]);
  const formatter = new Intl.NumberFormat('ko-KR');
  const navigate = useNavigate();
  // 유저정보 = useSelector();

  useEffect(() => {
    const list = async () => {
      const result = await axios.post('http://localhost:8888/shop/getCart', {}, { withCredentials: true });
      setCartList(result.data.result.list);
    }
    list();
  }, []);

  // const handleMinus = async (id) => {
  //   const result = await axios.post('/minusCart', {id, userId});
  //   setCartList(result);
  // };

  // const handlePlus = async (id) => {
  //   const result = await axios.post('/plusCart', {id, userId});
  //   setCartList(result);
  // };
  
  // const handleDelete = async (id) => {
  //   const result = await axios.post('/deleteCart', {id, userId});
  //   setCartList(result);
  // };
  
  const handlePay = () => {
    const totalPrice = cartList.reduce((prev, cart) => {
      return prev + (cart.price * cart.count);
    }, 0);
    const result = pay(cartList[0], cartList[0].count, totalPrice, cartList.length - 1);
    console.log(result);
    if (result.event == 'done' || result.event == 'issued') {
      alert('결제가 완료되었습니다!');
      navigate('/shop');
    }
    else if (result.event == 'cancel') {
      alert('결제 취소');
    }
  };

  return (
    <CartWrapper>
      <h2>장바구니🛒</h2>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>금액</th>
            <th>상품관리</th>
          </tr>
        </thead>
        <tbody>
          {cartList ?
          cartList.map((item, index) => {
            return (
            <tr key={item.postId}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className='count'
                  onClick={() => { undefined(item.id) }}
                >
                  -
                </button>
                {item.count}
                <button 
                  className='count'
                  onClick={() => { undefined(item.id) }}>
                  +
                </button>
              </td>
              <td>{formatter.format(item.price * item.count)}원</td>
              <td><button type='button' className='delete-btn' onClick={() => { undefined(item.id); }}>삭제</button></td>
            </tr>
          )})
          :
          <tr>
            <td colSpan={5}>물품이 없습니다.</td>
          </tr>
          }

          <tr className='total'>
            <th>합계</th>
            <td></td>
            <td></td>
            <th>
              {cartList && formatter.format(
                cartList.reduce((prev, cart) => {
                  return prev + (cart.price * cart.count);
                }, 0))}원
            </th>
            <td></td>
          </tr>
        </tbody>
      </Table>

      <button type='button' className='payBtn' onClick={handlePay}>결제하기</button>
    </CartWrapper>
  );
}

export default Cart;