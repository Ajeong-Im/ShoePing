import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import ShoePing from '../assets/logo/ShoePing.png';
import { db } from '../firebase';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.2rem;
  border-bottom: 1px solid #ebe7e7;
`;

const Logo = styled.img`
  height: 2.5rem;
  margin-top: 0.4rem;
  margin-left: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const CategoryUl = styled.ul`
  padding: 0;
`;

const Category = styled.a`
  font-family: Pretendard;
  font-size: 1rem;
  margin: 0 1.6rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AuthenticationDiv = styled.div``;

const Authentication = styled.a`
  font-family: Pretendard;
  font-size: 1rem;
  margin-right: 1.8rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export type CategoryNav = {
  brand: string;
  price: number;
  thumbnail: string;
  title: string;
};

function NavBar() {
  const [sneakers, setSneakers] = useState<CategoryNav[]>([]);
  const [running, setRunning] = useState<CategoryNav[]>([]);
  const [slippers, setSlippers] = useState<CategoryNav[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSigninModal = () => {
    setIsSigninModalOpen(true);
  };

  const closeSigninModal = () => {
    setIsSigninModalOpen(false);
  };

  useEffect(() => {
    // Firestore에서 데이터 가져오는 코드
    const fetchData = async () => {
      const sneakersCollectionRef = collection(db, 'sneakers');
      const runningCollectionRef = collection(db, 'running');
      const slippersCollectionRef = collection(db, 'slippers');

      const sneakersSnapshot = await getDocs(sneakersCollectionRef);
      const runningSnapshot = await getDocs(runningCollectionRef);
      const slippersSnapshot = await getDocs(slippersCollectionRef);

      const sneakersArray = sneakersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CategoryNav),
      }));
      setSneakers(sneakersArray);

      const runningArray = runningSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CategoryNav),
      }));
      setRunning(runningArray);

      const slippersArray = slippersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as CategoryNav),
      }));
      setSlippers(slippersArray);
    };

    fetchData();
  }, []);

  return (
    <NavigationBar>
      <Logo src={ShoePing} alt="ShoePing Logo" onClick={() => navigate('/')} />
      <CategoryUl>
        <Category
          onClick={() =>
            navigate('/category', { state: { categoryProps: sneakers } })
          }
        >
          스니커즈
        </Category>
        <Category
          onClick={() =>
            navigate('/category', { state: { categoryProps: running } })
          }
        >
          러닝화
        </Category>
        <Category
          onClick={() =>
            navigate('/category', { state: { categoryProps: slippers } })
          }
        >
          슬리퍼
        </Category>
        <Category onClick={() => navigate('/category/loafers')}>로퍼</Category>
        <Category onClick={() => navigate('/category/boots')}>부츠</Category>
        <Category onClick={() => navigate('/category/sandals')}>샌들</Category>
        <Category onClick={() => navigate('/category/loafers')}>로퍼</Category>
      </CategoryUl>
      <AuthenticationDiv>
        <Authentication onClick={openLoginModal}>로그인</Authentication>
        <Authentication onClick={openSigninModal}>회원가입</Authentication>
      </AuthenticationDiv>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isSigninModalOpen && <SignupModal onClose={closeSigninModal} />}
    </NavigationBar>
  );
}

export default NavBar;
