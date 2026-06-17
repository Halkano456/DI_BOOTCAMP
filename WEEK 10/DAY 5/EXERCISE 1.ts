
  

export interface Story {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

export interface Contributor {
  id: number;
  story_id: number;
  user_id: number;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Choose environment profile natively
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
// backend/src/middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Token Missing' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token Expired or Invalid' });
    req.user = decoded as { userId: number };
    next();
  });
};
// backend/src/middleware/authorize.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';
import { pool } from '../config/db';

export const authorizeStoryAccess = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { id: storyId } = req.params;

  try {
    const storyCheck = await pool.query('SELECT author_id FROM stories WHERE id = $1', [storyId]);
    if (storyCheck.rows.length === 0) return res.status(404).json({ message: 'Story not found' });

    const isAuthor = storyCheck.rows[0].author_id === userId;
    
    const contributorCheck = await pool.query(
      'SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2',
      [storyId, userId]
    );
    const isContributor = contributorCheck.rows.length > 0;

    // Actions involving updating require being an Author or a Contributor
    // Actions involving deleting require checking if the user is strictly the Author
    if (req.method === 'DELETE' && !isAuthor) {
      return res.status(403).json({ message: 'Only authors hold removal permissions.' });
    }

    if (!isAuthor && !isContributor) {
      return res.status(403).json({ message: 'Resource modification unauthorized.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Authorization evaluation collapsed.' });
  }
};
// frontend/src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/react-redux';
import { AuthState, User } from '../../../../types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    }
  }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
DATABASE_URL=postgresql://username:password@localhost:5432/storydb
JWT_SECRET=local_access_high_entropy_string_112233
REFRESH_SECRET=local_refresh_high_entropy_string_445566
NODE_ENV=development