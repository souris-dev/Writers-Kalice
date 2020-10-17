-- TABLE CREATION FOR WRITER'S KALICE DB

-- NOTE:
-- Prefill test - Prefill for testing purposes
-- Prefill test opt - Prefill for testing purposes, but optional
-- Prefill all init - Prefill all data for initialization of system
-- Prefill some init - Prefill some data for initialization of system

-- INSERTS: Prefill test
CREATE TABLE users_table (
    user_id         SERIAL          UNIQUE NOT NULL,
    username        VARCHAR(20)     UNIQUE NOT NULL,
    join_date       DATE            NOT NULL,
    security_qn     VARCHAR(100)    NOT NULL,
    security_ans    VARCHAR(40)     NOT NULL,
    privacy_det_id  INTEGER         NOT NULL,
    CONSTRAINT user_id_pk PRIMARY KEY (user_id)
);

-- INSERTS: Prefill test
CREATE TABLE user_email_ids (
    user_id         INTEGER,
    email           VARCHAR,
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id),
    CONSTRAINT user_email_pk PRIMARY KEY (user_id, email)
);

-- INSERTS: Prefill test
CREATE TABLE auth_helper_passes (
    passwd          VARCHAR(30)     UNIQUE NOT NULL,
    half_key        VARCHAR(30)     NOT NULL,
    CONSTRAINT auth_helper_pass_pk PRIMARY KEY (passwd, half_key)
);

-- INSERTS: Prefill test
CREATE TABLE auth_helper_userauths (
    user_id         INTEGER         NOT NULL,
    auth_id         SERIAL          NOT NULL,
    passwd          VARCHAR	    NOT NULL,
    CONSTRAINT auth_helper_userauth_pk PRIMARY KEY (user_id, auth_id),
    CONSTRAINT passwd_fk FOREIGN KEY (passwd) REFERENCES auth_helper_passes(passwd),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id)
);

-- INSERTS: Prefill all init
CREATE TABLE ranks (
    rank_id         SERIAL          PRIMARY KEY,
    description     VARCHAR(20)     NOT NULL,       -- Newbie, rookie, etc.
    num_stars       FLOAT           NOT NULL
);

INSERT INTO ranks VALUES (0, 'Starter', 0);

-- INSERTS: Prefill test
CREATE TABLE profiles (
    user_id             INTEGER         UNIQUE NOT NULL,
    name                VARCHAR	        NOT NULL,
    about_me            VARCHAR         NULL,
    is_above_eighteen   BOOLEAN         NOT NULL,
    npos_reacts         INTEGER         NOT NULL DEFAULT 0,
    profile_pic_url     TEXT            NOT NULL DEFAULT '',
    rank_id             INTEGER         NOT NULL DEFAULT 0,
    CONSTRAINT profile_pk PRIMARY KEY (user_id, name),
    CONSTRAINT profile_rank_fk FOREIGN KEY (rank_id) REFERENCES ranks(rank_id)
);

-- INSERTS: Prefill all init
CREATE TABLE privacy_details (
    detail_id       SERIAL          PRIMARY KEY,
    show_interests  BOOLEAN         NOT NULL,
    show_name       BOOLEAN         NOT NULL,
    show_bio        BOOLEAN         NOT NULL
);

ALTER TABLE users_table ADD CONSTRAINT privacy_fk FOREIGN KEY (privacy_det_id) REFERENCES privacy_details(detail_id);

-- INSERTS: Prefill some init
CREATE TABLE interest_tags (
    interest_id     SERIAL          PRIMARY KEY,
    description     VARCHAR(30)     NOT NULL
);

-- INSERTS: Prefill test
CREATE TABLE profile_interests (
    user_id         INTEGER         NOT NULL,
    name            VARCHAR	        NOT NULL,
    interest_id     INTEGER         NOT NULL,
    CONSTRAINT profile_interests_pk PRIMARY KEY (user_id, name, interest_id),
    CONSTRAINT interest_fk FOREIGN KEY (interest_id) REFERENCES interest_tags(interest_id)
);

-- INSERTS: Prefill test
CREATE TABLE posts (
    post_id             SERIAL          PRIMARY KEY,
    title               TEXT            NOT NULL DEFAULT '',
    content             TEXT            NOT NULL,
    anonymous           BOOLEAN         NOT NULL,
    min_rank            INTEGER         NOT NULL,
    expiry_date         DATE            NULL,
    posted_date         DATE            NOT NULL,
    is_above_eighteen   BOOLEAN         NOT NULL,
    postedby_uid        INTEGER         NOT NULL,
    CONSTRAINT postedby_fk FOREIGN KEY (postedby_uid) REFERENCES users_table(user_id),
    CONSTRAINT date_ck CHECK (posted_date > expiry_date),
    CONSTRAINT rank_ck CHECK (min_rank >= 0)    -- TODO: check upper limit too
);

-- INSERTS: Prefill test opt
CREATE TABLE view_requests (
    from_user_id    INTEGER     NOT NULL,
    to_user_id      INTEGER     NOT NULL,
    post_id         INTEGER     NOT NULL,
    sent_date_time  TIMESTAMP WITH TIME ZONE    NOT NULL,
    CONSTRAINT view_requests_pk PRIMARY KEY (from_user_id, to_user_id, post_id),
    CONSTRAINT from_uid_fk FOREIGN KEY (from_user_id) REFERENCES users_table(user_id),
    CONSTRAINT to_uid_fk FOREIGN KEY (to_user_id) REFERENCES users_table(user_id),
    CONSTRAINT post_fk FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

-- INSERTS: Prefill test opt
CREATE TABLE saved_posts (
    user_id         INTEGER     NOT NULL,
    post_id         INTEGER     NOT NULL,
    CONSTRAINT saved_posts_pk PRIMARY KEY (user_id, post_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id),
    CONSTRAINT post_fk FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

-- INSERTS: Prefill test opt
CREATE TABLE seen_posts (
    user_id         INTEGER     NOT NULL,
    post_id         INTEGER     NOT NULL,
    CONSTRAINT seen_posts_pk PRIMARY KEY (user_id, post_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id),
    CONSTRAINT post_fk FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

-- INSERTS: Prefill test opt
CREATE TABLE reactions (
    reaction_id     SERIAL      PRIMARY KEY,
    description     INTEGER     NOT NULL,
    pos_neg         VARCHAR(9)  NOT NULL,
    CONSTRAINT pos_neg_ck CHECK (pos_neg in ('positive', 'negative'))
);

-- INSERTS: Prefill test opt
CREATE TABLE post_reactions (
    user_id         INTEGER         NOT NULL,
    post_id         INTEGER         NOT NULL,
    reaction_id     INTEGER         NOT NULL,
    anonymous       BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT post_reactions_pk PRIMARY KEY (user_id, post_id, reaction_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id),
    CONSTRAINT post_fk FOREIGN KEY(post_id) REFERENCES posts(post_id),
    CONSTRAINT reaction_id FOREIGN KEY (reaction_id) REFERENCES reactions(reaction_id)
);

-- INSERTS: Prefill test opt
CREATE TABLE comments (
    comment_id      SERIAL          PRIMARY KEY,
    content         TEXT            NOT NULL,
    posted_dt_tm    TIMESTAMP WITH TIME ZONE NOT NULL,
    anonymous       BOOLEAN         NOT NULL DEFAULT FALSE
);

-- INSERTS: Prefill test opt, with comments
CREATE TABLE comment_text_pos_neg (
    content         TEXT            PRIMARY KEY,
    pos_neg         VARCHAR(9)      NOT NULL,
    -- CONSTRAINT comment_text_pos_neg_fk FOREIGN KEY (content) REFERENCES comments(content),
    CONSTRAINT pos_neg_ck CHECK (pos_neg in ('positive', 'negative'))
);

-- INSERTS: Prefill test opt, with comments and posts
CREATE TABLE post_comments (
    user_id         INTEGER         NOT NULL,
    post_id         INTEGER         NOT NULL,
    comment_id      INTEGER         NOT NULL,
    CONSTRAINT post_comments_pk PRIMARY KEY (user_id, post_id, comment_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users_table(user_id),
    CONSTRAINT post_fk FOREIGN KEY (post_id) REFERENCES posts(post_id),
    CONSTRAINT comment_fk FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);

-- INSERTS: Prefill test, with posts
CREATE TABLE post_interests (
    post_id         INTEGER         NOT NULL,
    interest_id     INTEGER         NOT NULL,
    CONSTRAINT post_interests_pk PRIMARY KEY (post_id, interest_id),
    CONSTRAINT post_fk FOREIGN KEY (post_id) REFERENCES posts(post_id),
    CONSTRAINT interest_fk FOREIGN KEY (interest_id) REFERENCES interest_tags(interest_id)
);
