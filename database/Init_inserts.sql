-- Ranks
insert into ranks(description, num_stars) values
('Beginner', 0),
('Rookie', 1),
('Novice', 2),
('Intermediate', 3),
('Pro', 4),
('Expert', 5);

-- Privacy details
insert into privacy_details(show_interests, show_name, show_bio) values
(true, true, true), (true, true, false), (true, false, true), (true, false, false),
(false, true, true), (false, true, false), (false, false, true), (false, false, false);

-- Interest tags
insert into interest_tags(description) values
('poetry'), ('prose'), ('short_stories'), ('idle_thoughts'), ('parody'), ('jokes'), ('nature');

-- Insert reactions
insert into reactions values
(1, 'Like', 'positive'),
(2, 'Dislike', 'negative');

-- For test:
truncate post_reactions;
insert into post_reactions values (2, 1, 1, false);

update profiles set npos_reacts = 0 where user_id = 2;