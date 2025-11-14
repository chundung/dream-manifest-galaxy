import styled from 'styled-components';

export const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

export const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: space-around;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover,
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    flex: 1;
    text-align: center;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md} 0;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
