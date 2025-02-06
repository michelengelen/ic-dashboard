import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

import { signIn, signOut, auth } from '@/auth';
import GitHubIcon from '@mui/icons-material/GitHub';

export default async function ProtectedPage() {
  const session = await auth()

  return (
    <Container maxWidth="sm"> {/* Center the content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          minHeight: '80vh', // Ensure full viewport height
          mt: 4 // Add some top margin
        }}
      >
        {session ? (
          <>
            <Typography variant="h5"
                        gutterBottom>
              Welcome, {session?.user?.name || session?.user?.email}!
            </Typography>
            <Typography variant="body1"
                        gutterBottom>
              This is your protected page.
            </Typography>

            <Stack direction="row"
                   spacing={2}>
              <Button variant="contained"
                      onClick={() => signOut()}>
                Sign out
              </Button>
            </Stack>
          </>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn('github', { redirectTo: '/dashboard' });
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              You are not signed in.
            </Typography>

            <Stack direction="row"
                   spacing={2}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{
                  px: 2
                }}
              >
                Sign in with GitHub
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </Container>
  );
}
