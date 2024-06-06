import {createBrowserRouter} from 'react-router-dom';
import AppLayout from '../../client/src/components/layout/AppLayout';
import MainLayout from '../../client/src/components/layout/MainLayout';
import Dashboard from '../../client/src/pages/Dashboard';
import ListofCompetitions from '../../client/src/pages/ListofCompetitions';
import ListofResources from '../../client/src/pages/ListofResources';
import SettingPage from '../../client/src/pages/SettingPage';

export const router = createBrowserRouter([

    {
        path: 'dashboard',
        element: <AppLayout />,
        children: [
            { index: true, 
              element: <Dashboard /> }
        ]
    },
    {
        path: 'listofcompetitions',
        element: <AppLayout />,
        children: [
            { index: true, 
              element: <ListofCompetitions /> }
        ]
    },
    {
        path: 'listofresources',
        element: <AppLayout />,
        children: [
            { index: true, 
              element: <ListofResources /> }
        ]
    },
    {
        path: 'setting',
        element: <AppLayout />,
        children: [
            { index: true, 
              element: <SettingPage /> }
        ]
    }
]);