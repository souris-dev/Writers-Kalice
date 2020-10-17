-- Gets a post: /posts/getpost
-- 1. Get everything except the tags
select post_id, title, content, n_pos_rcn, n_neg_rcn, n_comments, anonymous, postedby_username, posted_date from getpost_view_com_rcn_int
where post_id = 101;

-- 2. Get the tags
select it.description as interest from post_interests left join interest_tags it on post_interests.interest_id = it.interest_id
where post_interests.post_id = 101;
-- OR USE VIEW:
select description as interest from posts_get_interest_tags where post_id = 101;


-- Gets the comments on a post /posts/getcomments
select content, user_id, anonymous from post_comments pc left join comments c on c.comment_id = pc.comment_id
where post_id = 101;
-- use the uid from the prev query here to get the postedbyUsername:
select username as postedby_username from users_table where user_id = 1;
-- OR USE THE VIEW (single query) instead of above 2:
select content, postedby_username, anonymous from get_comments where post_id = 101;


-- Gets the data required for author display
select name, username, rank_id, rank_desc, num_stars, about_me as bio, show_name, show_bio, show_interests from profile_display
where user_id = 101;


-- Gets the data for the profile settings page