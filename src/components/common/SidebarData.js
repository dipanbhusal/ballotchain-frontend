import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

import { AiFillHome, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai'
import { IoIosPerson, IoIosPeople } from 'react-icons/io'
import { FaVoteYea } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Vote',
    path: '/vote',
    icon: <FaVoteYea />,
    cName: 'nav-text',
  },
  {
    title: 'Candidates',
    path: '/candidates',
    icon: <IoIosPeople />,
    cName: 'nav-text',
  },
  {
    title: 'Parties',
    path: '/parties',
    icon: <IoIosPerson />,
    cName: 'nav-text',
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <ImProfile />,
    cName: 'nav-text',
  },
]
