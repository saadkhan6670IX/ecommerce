import React, {useEffect, useState} from 'react';
import ThemeOneSelectBranch from './ThemeOneSelectBranch';
import {getAllBranches} from '../../../services/Branch';

import {useSelector, useDispatch} from 'react-redux';

export default function index(props) {
  return <ThemeOneSelectBranch {...props}></ThemeOneSelectBranch>;
}
