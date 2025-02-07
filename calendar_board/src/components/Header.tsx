import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
`;

const Logo = styled.img`
  height: 30px;
  margin-left: 5%;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 5%;
`;

const UserName = styled.span`
  margin: 0 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 8px 0;
  margin: 0;
  width: 150px;
  border-radius: 4px;
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <Logo src="/Header/Vector.png" alt="Project Logo" />
      <UserSection ref={dropdownRef}>
        <img src="/Header/User.png" alt="User Avatar" width={45} height={45} />
        <UserName>지원자님</UserName>
        <DropdownButton onClick={() => setMenuOpen((prev) => !prev)}>
          ▼
        </DropdownButton>
        <AnimatePresence>
          {menuOpen && (
            <DropdownMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownItem>설정</DropdownItem>
              <DropdownItem>로그아웃</DropdownItem>
            </DropdownMenu>
          )}
        </AnimatePresence>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
