import React from 'react';
import styled from 'styled-components';
import ShoePing from '../assets/logo/ShoePing.png';

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

interface SignupModalProps {
  onClose: () => void;
}

// eslint-disable-next-line react/function-component-definition
const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const handleSignup = () => {
    onClose();
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContainer>
        <div>
          <Logo src={ShoePing} alt="ShoePing Logo" />
        </div>
        회원가입
        <div>
          <Input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임"
          />
        </div>
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
        <div>
          <Input
            type="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
          />
        </div>
        <Button onClick={handleSignup}>회원가입</Button>
        <div>
          이미 회원이신가요?{' '}
          <StyledLink
            onClick={() => {
              onClose();
            }}
          >
            로그인
          </StyledLink>
        </div>
      </ModalContainer>
    </>
  );
};

export default SignupModal;
