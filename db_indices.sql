-- Create indices for high-frequency search and ordering columns
CREATE INDEX idx_user_role_xp ON users (role, xp DESC);
CREATE INDEX idx_user_name_role ON users (name, role);
CREATE INDEX idx_user_email ON users (email);
CREATE INDEX idx_question_diff ON questions (difficulty, id);

-- Added for Performance Optimization
CREATE INDEX idx_leaderboard_user ON leaderboard (user_id);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts (user_id);
