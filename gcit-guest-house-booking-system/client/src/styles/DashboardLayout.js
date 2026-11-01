import styled from 'styled-components';
export const DashboardContainer = styled.div`
display: flex;
min-height: 100vh;
background-color: #f8fafc;
@media (max-width: 768px) {
 flex-direction: column;
}
`;
export const Sidebar = styled.aside`
width: 270px;
background-color: #0f172a; /* Solid Dark Navy from Login Button */
color: #ffffff;
display: flex;
flex-direction: column;
padding: 1.75rem 1.25rem;
box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
flex-shrink: 0;
@media (max-width: 768px) {
 width: 100%;
 padding: 1.25rem;
}
`;
export const BrandTitle = styled.div`
margin-bottom: 2.25rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 100%;
/* Vertically stack and center the logo and text */
.signup-logo {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
 gap: 0.75rem;
 width: 100%;
 color: #ffffff !important;
}
 .signup-logo-badge {
 display: flex;
 align-items: center;
 justify-content: center;
 width: 48px;
 height: 48px;
 background-color: #ffffff;
 border: 1.5px solid #ffffff;
 border-radius: 12px;
 color: #0f172a !important;
 margin: 0 auto;
}
.signup-logo-text {
 font-size: 0.875rem;
 font-weight: 700;
 line-height: 1.3;
 color: #ffffff !important;
 letter-spacing: -0.01em;
 text-align: center;
}
`;
export const NavItem = styled.button`
display: flex;
align-items: center;
gap: 0.75rem;
width: 100%;
padding: 0.85rem 1rem;
margin-bottom: 0.5rem;
border-radius: 10px;
border: none;
font-size: 0.925rem;
font-weight: 600;
cursor: pointer;
transition: all 0.2s ease-in-out;
/* Active tab uses subtle slate dark highlight instead of bright purple */
background-color: ${(props) => (props.$active ? '#1e293b' : 'transparent')};
color: ${(props) => (props.$active ? '#ffffff' : '#94a3b8')};
&:hover {
 background-color: #1e293b;
 color: #ffffff;
}
`;
export const MainContent = styled.main`
flex: 1;
padding: 2.25rem;
overflow-y: auto;
width: 100%;
@media (max-width: 768px) {
 padding: 1.25rem;
}
`;
export const HeaderBar = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 2rem;
padding-bottom: 1rem;
border-bottom: 1px solid #e2e8f0;
@media (max-width: 768px) {
 flex-direction: column;
 align-items: flex-start;
 gap: 0.75rem;
}
`;