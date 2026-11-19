import type { ReactElement } from 'react';
import BrandLogo from '../assets/icon.png';
import './style/header.css';

export default function BrandName(): ReactElement {
  return (
    <img
      src={BrandLogo}
      alt="logo with brand name in the left of the header"
      className="brand-logo"
    />
  );
}
