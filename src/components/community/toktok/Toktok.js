import React from 'react';
import { ToktokWrapper } from '../../../css/community';
import ToktokItem from './ToktokItem';
import { useNavigate } from 'react-router-dom';

function Toktok(props) {
  const navigate = useNavigate();

  const test = [
    {
      a: '1111',
      b: '2222',
      postId: '123123'
    }, {
      a: '3333',
      b: '4444',
      postId: '123123aa'
    }, {
      a: '5555',
      b: '6666'
    }, {
      a: '5555',
      b: '6666'
    }, {
      a: '5555',
      b: '6666'
    },
  ];

  return (
    <ToktokWrapper>
      <h1>육아톡톡</h1>
      <br /><br />
      <div className='between'>
        <span>반려 생활 중 고민거리, 궁금증이 있으신가요? 지금 바로 질문해 보세요</span>
        <button onClick={() => { navigate(`/community/insert/toktok`) }}>질문하러 가기</button>
      </div>
      <br /><hr />
      <div>
        {test.map((testMap) => { // 게시글들 맵
          return <ToktokItem
            a={testMap.a}
            b={testMap.b}
            postId={testMap.postId}
          />
        })}
      </div>
    </ToktokWrapper>
  );
}

export default Toktok;