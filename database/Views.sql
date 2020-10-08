
-- /posts/getPost
-- can also be used for /posts/getNewPosts
CREATE OR REPLACE VIEW posts_postedby_uname AS
SELECT p.post_id as post_id, ut.username as postedby_username
FROM posts p
LEFT JOIN users_table ut on p.postedby_uid = ut.user_id;

CREATE OR REPLACE VIEW getpost_view_com_rcn_int AS
SELECT interm_no_interests.post_id as post_id, content, title, anonymous,
       min_rank, expiry_date, posted_date,
       above_eighteen, postedby_uid, postedby_username,
       n_comments, n_pos_rcn, n_neg_rcn
FROM (
        (
            SELECT p.post_id as post_id, p.content as content, p.title as title,
               p.anonymous as anonymous, min_rank, expiry_date, posted_date,
               above_eighteen, postedby_uid,
               COUNT(pcom.comment_id) as n_comments,
               SUM(
                    CASE rcn.pos_neg
                        WHEN 'positive' THEN 1
                        ELSE 0
                    END
                ) AS n_pos_rcn,
               SUM (
                   CASE rcn.pos_neg
                        WHEN 'negative' THEN 1
                        ELSE 0
                   END
                ) AS n_neg_rcn
            FROM reactions rcn
            RIGHT JOIN post_reactions prcn ON prcn.reaction_id = rcn.reaction_id
            RIGHT JOIN posts p ON p.post_id = prcn.post_id
            RIGHT JOIN post_comments pcom ON p.post_id = pcom.post_id
            GROUP BY p.post_id
        )
    AS interm_no_interests
    LEFT JOIN posts_postedby_uname
    ON interm_no_interests.post_id = posts_postedby_uname.post_id
)

LEFT JOIN post_interests pint ON interm_no_interests.post_id = pint.post_id
WHERE posts_postedby_uname.post_id = interm_no_interests.post_id;


-- /posts/getComments
-- Note: This view DOES NOT join the posts table.
CREATE OR REPLACE VIEW get_comments AS
SELECT pc.post_id, pc.user_id as postedby_uid, ut.username as postedby_username,
       c.content, c.anonymous, c.posted_dt_tm
FROM users_table ut
RIGHT JOIN post_comments pc ON pc.user_id = ut.user_id
LEFT JOIN comments c ON pc.comment_id = c.comment_id;


-- /posts/getSavedPosts
CREATE OR REPLACE VIEW get_saved_posts AS
SELECT ut.user_id, gpv.post_id, content, title, anonymous,
       min_rank, expiry_date, posted_date,
       above_eighteen, postedby_uid, postedby_username,
       n_comments, n_pos_rcn, n_neg_rcn
FROM users_table ut
LEFT JOIN seen_posts sp ON ut.user_id = sp.user_id
LEFT JOIN getpost_view_com_rcn_int gpv ON sp.post_id = gpv.post_id;


-- /posts/getReactionDetails (Inactive for now)
-- Note: This view DOES NOT join the posts table.
CREATE OR REPLACE VIEW get_reactions AS
SELECT pr.post_id as post_id, r.reaction_id as reaction_id, r.description as description,
       (CASE r.pos_neg WHEN 'positive' THEN TRUE ELSE FALSE END) as positivity
FROM post_reactions pr
LEFT JOIN reactions r ON pr.reaction_id = r.reaction_id;


-- /posts/getInterestTags
CREATE OR REPLACE VIEW posts_get_interest_tags AS
SELECT pi.post_id as post_id, pi.interest_id as interest_id, description
FROM post_interests pi
LEFT JOIN interest_tags it on pi.interest_id = it.interest_id;


-- /user/profileDisplay
CREATE OR REPLACE VIEW profile_info AS
SELECT user_id, name, about_me, p.rank_id as rank_id, r.num_stars as num_stars,
       r.description as rank_desc
FROM profiles p
LEFT JOIN ranks r ON p.rank_id = r.rank_id;

CREATE OR REPLACE VIEW user_privacy AS
SELECT user_id, show_interests, show_name, show_bio
FROM users_table ut
LEFT JOIN privacy_details pd on ut.privacy_det_id = pd.detail_id;

CREATE OR REPLACE VIEW profile_display AS
SELECT pi.user_id as user_id, name, about_me, rank_id, num_stars,
       rank_desc, show_interests, show_name, show_bio
FROM profile_info pi
LEFT JOIN user_privacy up on pi.user_id = up.user_id;


-- /user/getInterestTags
CREATE OR REPLACE VIEW user_get_interest_tags AS
SELECT pi.user_id as user_id, pi.interest_id as interest_id, description
FROM profile_interests pi
LEFT JOIN interest_tags it on pi.interest_id = it.interest_id;