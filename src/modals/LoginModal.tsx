import React from 'react';
import styled from 'styled-components';
import ShoePing from '../assets/logo/ShoePing.png';
import { auth, signInWithEmailAndPassword } from '../firebase';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-top: 0.4rem;
  margin-left: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  background-color: #ffe4e1;
  color: white;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
`;

const StyledLink = styled.span`
  color: blue;
  cursor: pointer;
`;

interface LoginModalProps {
  onClose: () => void;
}

// eslint-disable-next-line react/function-component-definition
const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      // Firebase를 사용하여 이메일과 비밀번호로 로그인
      await signInWithEmailAndPassword(auth, email, password);

      // 로그인 성공 시 추가 작업 수행
      // 예: 리다이렉션, 상태 업데이트 등

      // 모달 닫기
      console.log('로그인 성공');
      console.log(auth.currentUser, email, password);
      onClose();
    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.error('로그인 실패');
      // 에러를 사용자에게 표시하는 등의 추가 작업 수행
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <div>
          <Logo src={ShoePing} alt="ShoePing Logo" />
        </div>
        로그인
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
        </div>
        <div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        <Button onClick={handleLogin}>로그인</Button>
        <div>
          아직 회원이 아니신가요?{' '}
          <StyledLink
            onClick={() => {
              onClose();
            }}
          >
            회원가입
          </StyledLink>
        </div>
      </ModalContainer>
    </>
  );
};

export default LoginModal;
