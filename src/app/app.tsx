import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/configs/query-client/query-client';
import { MantineProvider } from '@mantine/core';
import { theme } from '../shared/theme/theme';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { RouterProvider } from 'react-router-dom';
import { router } from '../shared/configs/router/router';

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position='top-right' autoClose={1500}/>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
};