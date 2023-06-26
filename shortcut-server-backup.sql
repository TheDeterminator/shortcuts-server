--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: sleep_event_type; Type: TYPE; Schema: public; Owner: alecjordan
--

CREATE TYPE public.sleep_event_type AS ENUM (
    'go_to_sleep',
    'wake_up',
    'nap'
);


ALTER TYPE public.sleep_event_type OWNER TO alecjordan;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: alecjordan
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO alecjordan;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: alecjordan
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pgmigrations_id_seq OWNER TO alecjordan;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alecjordan
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: sleep_data; Type: TABLE; Schema: public; Owner: alecjordan
--

CREATE TABLE public.sleep_data (
    id integer NOT NULL,
    event_timestamp timestamp without time zone NOT NULL,
    event_type public.sleep_event_type NOT NULL,
    duration interval,
    notes text
);


ALTER TABLE public.sleep_data OWNER TO alecjordan;

--
-- Name: sleep_data_id_seq; Type: SEQUENCE; Schema: public; Owner: alecjordan
--

CREATE SEQUENCE public.sleep_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sleep_data_id_seq OWNER TO alecjordan;

--
-- Name: sleep_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alecjordan
--

ALTER SEQUENCE public.sleep_data_id_seq OWNED BY public.sleep_data.id;


--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: alecjordan
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Name: sleep_data id; Type: DEFAULT; Schema: public; Owner: alecjordan
--

ALTER TABLE ONLY public.sleep_data ALTER COLUMN id SET DEFAULT nextval('public.sleep_data_id_seq'::regclass);


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: alecjordan
--

COPY public.pgmigrations (id, name, run_on) FROM stdin;
\.


--
-- Data for Name: sleep_data; Type: TABLE DATA; Schema: public; Owner: alecjordan
--

COPY public.sleep_data (id, event_timestamp, event_type, duration, notes) FROM stdin;
1	2023-05-06 02:25:00	go_to_sleep	\N	test notes are added...
2	2023-05-07 02:46:00	go_to_sleep	\N	
3	2023-05-08 01:55:00	go_to_sleep	\N	
4	2023-05-09 01:48:00	go_to_sleep	\N	
5	2023-05-10 02:02:00	go_to_sleep	\N	
6	2023-05-11 03:45:00	go_to_sleep	\N	Est
7	2023-05-12 02:36:00	go_to_sleep	\N	Est
8	2023-05-13 00:17:00	go_to_sleep	\N	
9	2023-05-14 02:25:00	go_to_sleep	\N	
10	2023-05-15 05:12:00	go_to_sleep	\N	Took a nap earlier
11	2022-05-16 01:35:00	go_to_sleep	\N	
12	2023-05-17 02:08:00	go_to_sleep	\N	
13	2023-05-18 00:49:00	go_to_sleep	\N	+/- 10 minutes PST
14	2023-05-18 01:16:00	go_to_sleep	\N	Actual PDT
15	2023-05-18 22:50:00	go_to_sleep	\N	
16	2023-05-20 01:00:00	go_to_sleep	\N	
17	2023-05-21 00:01:00	go_to_sleep	\N	Within 30-40 minutes of this time
18	2023-05-22 02:17:00	go_to_sleep	\N	
19	2023-05-23 01:19:00	go_to_sleep	\N	
20	2023-05-24 00:19:00	go_to_sleep	\N	
21	2023-05-25 00:39:00	go_to_sleep	\N	
22	2023-05-26 00:25:00	go_to_sleep	\N	
23	2023-05-26 04:45:00	go_to_sleep	\N	Second bout…Jo still up my anxiety is through the roof
24	2023-05-28 02:16:00	go_to_sleep	\N	
25	2023-05-28 03:26:00	go_to_sleep	\N	Erase last time
26	2023-06-01 04:44:00	go_to_sleep	\N	
27	2023-06-02 03:28:00	go_to_sleep	\N	
28	2023-06-03 02:59:00	go_to_sleep	\N	
29	2023-06-07 03:20:00	go_to_sleep	\N	
30	2023-06-08 02:38:00	go_to_sleep	\N	
31	2023-06-09 02:10:00	go_to_sleep	\N	
32	2023-06-10 01:39:00	go_to_sleep	\N	
33	2023-06-11 01:26:00	go_to_sleep	\N	
34	2023-06-12 01:37:00	go_to_sleep	\N	
35	2023-06-13 04:08:00	go_to_sleep	\N	
36	2023-06-14 01:18:00	go_to_sleep	\N	
37	2023-06-16 02:23:00	go_to_sleep	\N	
38	2023-06-17 00:00:00	go_to_sleep	\N	
39	2023-06-19 09:19:00	go_to_sleep	\N	2pm
161	2023-06-13 07:09:00	wake_up	\N	
162	2023-06-14 10:50:00	wake_up	\N	
163	2023-06-15 09:11:00	wake_up	\N	
164	2023-06-16 09:23:00	wake_up	\N	
165	2023-06-17 06:01:00	wake_up	\N	
166	2023-06-19 09:19:00	wake_up	\N	
167	2023-06-20 10:17:00	wake_up	\N	
168	2023-06-22 10:00:00	wake_up	\N	
40	2022-12-27 10:18:00	wake_up	\N	Up and down before this but getting up now
41	2022-12-28 11:11:00	wake_up	\N	
42	2022-12-29 11:18:00	wake_up	\N	Up and down several times and had to sleep on the hard, not very comfortable floor
43	2022-12-31 10:14:00	wake_up	\N	About 20 minutes before this
44	2023-01-01 11:14:00	wake_up	\N	
45	2023-01-02 10:21:00	wake_up	\N	-20 minutes
46	2023-01-04 10:30:00	wake_up	\N	-30
47	2023-01-05 09:43:00	wake_up	\N	
48	2023-01-07 11:24:00	wake_up	\N	
49	2023-01-09 07:39:00	wake_up	\N	
50	2023-01-10 11:48:00	wake_up	\N	
51	2023-01-16 10:16:00	wake_up	\N	
52	2023-01-20 11:00:00	wake_up	\N	
53	2023-01-21 09:35:00	wake_up	\N	
54	2023-02-06 12:00:00	wake_up	\N	
55	2023-02-07 11:18:00	wake_up	\N	
56	2023-02-08 13:13:00	wake_up	\N	
57	2023-02-09 11:15:00	wake_up	\N	Woke up  11, possibly a little earlier since I didn't have my sleep mask all the way on.
58	2023-02-10 09:14:00	wake_up	\N	First woke up Around 6 🙄....
59	2023-02-11 09:58:00	wake_up	\N	Been up and down since 7
60	2023-02-13 11:54:00	wake_up	\N	
61	2023-02-14 11:05:00	wake_up	\N	
62	2023-02-15 11:56:00	wake_up	\N	-30
63	2023-02-16 12:08:00	wake_up	\N	Been up and down for a while
64	2023-02-18 11:53:00	wake_up	\N	Went to bed after 5
65	2023-02-19 12:36:00	wake_up	\N	-10
66	2023-02-20 11:20:00	wake_up	\N	Woke up briefly a few times before but this is the real time
67	2023-02-21 12:40:00	wake_up	\N	-15 minutes
68	2023-02-22 12:02:00	wake_up	\N	This is when I opened my eyes but I probably started to wake up earlier
69	2023-02-24 12:26:00	wake_up	\N	
70	2023-02-25 10:26:00	wake_up	\N	Maybe 10 minutes ago
71	2023-02-26 11:00:00	wake_up	\N	
72	2023-02-27 08:39:00	wake_up	\N	least for now.
73	2023-02-28 11:05:00	wake_up	\N	A Little earlier maybe
74	2023-03-01 12:29:00	wake_up	\N	Been struggling to get up for the better part of an hour
75	2023-03-04 10:40:00	wake_up	\N	Little earlier than this
76	2023-03-05 04:56:00	wake_up	\N	First wake up about 30 minutes ago
77	2023-03-05 10:50:00	wake_up	\N	Second wake up
78	2023-03-06 11:38:00	wake_up	\N	
79	2023-03-07 11:42:00	wake_up	\N	
80	2023-03-09 09:45:00	wake_up	\N	
81	2023-03-10 11:01:00	wake_up	\N	
82	2023-03-12 10:55:00	wake_up	\N	
83	2023-03-14 08:34:00	wake_up	\N	🙄
84	2023-03-15 10:50:00	wake_up	\N	
85	2023-03-16 10:19:00	wake_up	\N	About 20 minutes ago, forcibly 😵‍💫 it's cool though
86	2023-03-17 10:24:00	wake_up	\N	Up and awake 😎. I probably work up a little earlier though tbh
87	2023-03-19 06:51:00	wake_up	\N	Minus 90m
88	2023-03-20 11:22:00	wake_up	\N	-20 minutes
89	2023-03-21 12:22:00	wake_up	\N	
90	2023-03-23 11:58:00	wake_up	\N	
91	2023-03-26 13:35:00	wake_up	\N	
92	2023-04-01 10:24:00	wake_up	\N	
93	2023-04-03 12:01:00	wake_up	\N	The second time
94	2023-04-05 12:13:00	wake_up	\N	
95	2023-04-07 11:40:00	wake_up	\N	Up for a while but struggling to get up
96	2023-04-09 09:57:00	wake_up	\N	-20
97	2023-04-10 11:25:00	wake_up	\N	Roughly
98	2023-04-12 10:22:00	wake_up	\N	
99	2023-04-13 06:23:00	wake_up	\N	Probably will fall back asleep eventually
100	2023-04-14 10:16:00	wake_up	\N	
101	2023-04-15 10:13:00	wake_up	\N	
102	2023-04-15 10:19:00	wake_up	\N	-19
103	2023-04-16 10:56:00	wake_up	\N	Been trying to get up for a while
104	2023-04-17 09:39:00	wake_up	\N	
105	2023-04-18 07:28:00	wake_up	\N	15-20 minutes earlier than this
106	2023-04-19 10:32:00	wake_up	\N	
107	2023-04-20 09:35:00	wake_up	\N	
108	2023-04-21 10:35:00	wake_up	\N	
109	2023-04-22 09:05:00	wake_up	\N	
110	2023-04-23 10:10:00	wake_up	\N	Probably earlier actually
111	2023-04-24 06:56:00	wake_up	\N	
112	2023-04-24 12:55:00	wake_up	\N	Long nap
113	2023-04-25 10:38:00	wake_up	\N	Woke up earlier but could not get up for the life of me
114	2023-04-26 06:48:00	wake_up	\N	Had to pea but now I feel super awake
115	2023-04-27 08:35:00	wake_up	\N	May fall back asleep
116	2023-04-29 07:13:00	wake_up	\N	
117	2023-04-29 07:13:00	wake_up	\N	
118	2023-04-30 09:17:00	wake_up	\N	Went to sleep around 12
119	2023-05-01 09:55:00	wake_up	\N	
120	2023-05-02 08:27:00	wake_up	\N	
121	2023-05-02 08:27:00	wake_up	\N	
122	2023-05-03 08:32:00	wake_up	\N	
123	2023-05-04 08:29:00	wake_up	\N	
124	2023-05-05 13:05:00	wake_up	\N	
125	2023-05-06 10:38:00	wake_up	\N	Was up and down earlier than this. But this is when I opened my eyes fully
126	2023-05-07 10:17:00	wake_up	\N	
127	2023-05-08 10:05:00	wake_up	\N	Was up and down earlier but officially this is the wake up time
128	2023-05-09 09:09:00	wake_up	\N	
129	2023-05-10 06:03:00	wake_up	\N	PST, hoping to fall back asleep later, getting on a flight
130	2023-05-11 11:20:00	wake_up	\N	Est, I've been up and down for a while
131	2023-05-12 08:01:00	wake_up	\N	For now
132	2023-05-13 10:05:00	wake_up	\N	Been up and down for about an hour now
133	2023-05-14 08:13:00	wake_up	\N	
134	2023-05-15 09:35:00	wake_up	\N	Been up 20-30 minutes maybe a little longer
135	2023-05-16 10:11:00	wake_up	\N	
136	2023-05-17 09:29:00	wake_up	\N	Been up for 30-60 minutes
137	2023-05-18 07:04:00	wake_up	\N	-30 minutes
138	2023-05-19 08:37:00	wake_up	\N	For now
139	2023-05-20 08:48:00	wake_up	\N	first woke up around 5:53
140	2022-05-21 08:30:00	wake_up	\N	woke up a little before but couldn’t move
141	2023-05-22 09:57:00	wake_up	\N	Give or take
142	2023-05-23 09:43:00	wake_up	\N	
143	2023-05-24 09:04:00	wake_up	\N	feeling very awake this morning. I think that’s because of adequate sleep
144	2023-05-25 08:29:00	wake_up	\N	Maybe slightly earlier than this
145	2023-05-27 09:16:00	wake_up	\N	
146	2023-05-28 10:36:00	wake_up	\N	
147	2023-05-29 10:39:00	wake_up	\N	Was up earlier then fell back asleep
148	2023-05-30 14:03:00	wake_up	\N	
149	2023-05-31 12:22:00	wake_up	\N	
150	2023-06-01 10:45:00	wake_up	\N	
151	2023-06-02 11:51:00	wake_up	\N	
152	2023-06-03 11:16:00	wake_up	\N	
153	2023-06-05 10:03:00	wake_up	\N	
154	2023-06-05 10:03:00	wake_up	\N	
155	2023-06-07 10:56:00	wake_up	\N	Closer to 10 actually
156	2023-06-08 09:13:00	wake_up	\N	
157	2023-06-09 09:33:00	wake_up	\N	Woke up  7:30 then went back to sleep a bit
158	2023-06-10 09:51:00	wake_up	\N	
159	2023-06-11 09:59:00	wake_up	\N	out of bed  10:10-10:15
160	2023-06-12 06:30:00	wake_up	\N	
170	2022-06-25 08:05:00	wake_up	\N	then I went outside
171	2022-06-26 07:15:00	wake_up	\N	went outside half hour later
172	2022-06-27 09:20:00	wake_up	\N	
173	2022-06-28 10:09:00	wake_up	\N	
174	2022-06-29 08:50:00	wake_up	\N	
175	2022-06-30 08:40:00	wake_up	\N	
176	2022-07-01 09:30:00	wake_up	\N	
177	2022-07-02 07:45:00	wake_up	\N	
178	2022-07-03 06:30:00	wake_up	\N	
179	2022-07-04 06:30:00	wake_up	\N	outside at 8am
180	2022-07-05 06:30:00	wake_up	\N	outside at 7:50am
181	2022-07-06 05:05:00	wake_up	\N	outside at 8AM
182	2022-07-07 07:20:00	wake_up	\N	outside never
183	2022-07-08 06:40:00	wake_up	\N	
184	2022-07-11 09:30:00	wake_up	\N	
185	2022-07-12 07:30:00	wake_up	\N	
186	2022-07-13 08:30:00	wake_up	\N	
187	2022-07-14 08:30:00	wake_up	\N	but I actually woke up before; outside around 9:30 or 10
188	2022-07-15 07:30:00	wake_up	\N	
189	2022-07-16 07:31:00	wake_up	\N	
190	2022-07-17 07:30:00	wake_up	\N	
191	2012-07-18 07:30:00	wake_up	\N	
192	2022-07-19 07:30:00	wake_up	\N	
193	2022-07-20 06:59:00	wake_up	\N	although probably I woke up earlier originally
194	2022-07-21 07:30:00	wake_up	\N	was half awake earlier though
195	2022-07-22 07:00:00	wake_up	\N	
196	2022-07-23 07:50:00	wake_up	\N	
197	2022-07-25 07:40:00	wake_up	\N	
198	2022-07-26 07:55:00	wake_up	\N	was actually awake much earlier
199	2022-07-27 07:30:00	wake_up	\N	
200	2022-07-28 08:00:00	wake_up	\N	
201	2022-07-30 07:00:00	wake_up	\N	
202	2022-08-01 07:50:00	wake_up	\N	
203	2022-08-02 08:15:00	wake_up	\N	
204	2022-08-03 07:15:00	wake_up	\N	took forever to get out of bed, 7:50
205	2022-08-05 07:45:00	wake_up	\N	
206	2022-08-07 08:00:00	wake_up	\N	
207	2022-08-08 07:36:00	wake_up	\N	
208	2022-08-09 07:36:00	wake_up	\N	
209	2022-08-10 07:04:00	wake_up	\N	although it’s possible I was up earlier than that.
210	2022-08-16 07:20:00	wake_up	\N	
211	2022-08-17 08:17:00	wake_up	\N	
212	2022-08-18 07:16:00	wake_up	\N	
213	2022-08-22 07:32:00	wake_up	\N	
214	2022-08-23 07:26:00	wake_up	\N	
215	2022-08-24 05:00:00	wake_up	\N	
216	2022-08-26 07:41:00	wake_up	\N	
217	2022-09-01 08:49:00	wake_up	\N	
218	2022-09-02 08:00:00	wake_up	\N	
219	2022-09-03 07:00:00	wake_up	\N	
220	2022-09-04 07:30:00	wake_up	\N	
221	2022-09-05 09:00:00	wake_up	\N	
222	2022-09-06 09:30:00	wake_up	\N	
223	2022-09-07 09:30:00	wake_up	\N	
224	2022-09-08 09:30:00	wake_up	\N	
225	2022-09-08 09:30:00	wake_up	\N	
226	2022-09-10 08:25:00	wake_up	\N	
227	2022-09-14 08:46:00	wake_up	\N	
228	2022-09-15 09:00:00	wake_up	\N	maybe a little earlier
229	2022-09-16 08:46:00	wake_up	\N	
230	2022-09-17 08:46:00	wake_up	\N	
231	2022-09-18 08:50:00	wake_up	\N	
232	2022-09-19 08:40:00	wake_up	\N	
233	2022-09-20 08:50:00	wake_up	\N	by alarm
234	2022-09-21 09:00:00	wake_up	\N	
235	2022-09-24 09:20:00	wake_up	\N	Opened my eyes but woke up a lot earlier
236	2022-09-25 09:55:00	wake_up	\N	Officially, but I had been up and down for hours before that
237	2022-09-26 09:03:00	wake_up	\N	Opened my eyes at 9 but probably woke up closer to 8:30
238	2022-09-28 09:21:00	wake_up	\N	
239	2022-09-29 08:48:00	wake_up	\N	Woke up once at 4AM because it was too hot
240	2022-10-03 07:47:00	wake_up	\N	Up earlier than usual maybe because of heat which may be from eating late. Or May be because of mock interview today
241	2022-10-04 07:42:00	wake_up	\N	
242	2022-10-07 09:43:00	wake_up	\N	A little earlier than this actually
243	2022-10-09 07:00:00	wake_up	\N	Was in and out of consciousness a little earlier than this, I think
244	2022-10-10 07:00:00	wake_up	\N	
245	2022-10-10 09:19:00	wake_up	\N	Fell back asleep and woke up again
246	2022-10-11 08:26:00	wake_up	\N	
247	2022-10-12 09:28:00	wake_up	\N	
248	2022-10-13 09:49:00	wake_up	\N	
249	2022-10-14 10:03:00	wake_up	\N	First woke up around 9:15 by alarm then slept back in until 10
250	2022-10-16 08:39:00	wake_up	\N	
251	2022-10-19 08:41:00	wake_up	\N	20 minutes earlier maybe
252	2022-10-26 09:48:00	wake_up	\N	Tired , am I up too late?
253	2022-10-29 08:17:00	wake_up	\N	Probably more like 8AM
254	2022-10-31 11:49:00	wake_up	\N	Changing time zones
255	2022-11-01 07:11:00	wake_up	\N	Maybe 20 minutes earlier than this
256	2022-11-06 09:08:00	wake_up	\N	Daylight savings
257	2022-11-08 10:39:00	wake_up	\N	Actually may have woke up a little bit earlier but couldn't get up.
258	2022-11-09 09:14:00	wake_up	\N	Abt 9
259	2022-11-10 09:55:00	wake_up	\N	Alarm woke me up a bit
260	2022-11-11 09:23:00	wake_up	\N	
261	2022-11-12 09:16:00	wake_up	\N	
262	2022-11-13 09:32:00	wake_up	\N	
263	2022-11-15 09:37:00	wake_up	\N	
264	2022-11-16 10:42:00	wake_up	\N	Woke up  9 but fell back asleep
265	2022-11-17 11:24:00	wake_up	\N	Woke up  7 then fell back asleep
266	2022-11-19 09:19:00	wake_up	\N	Maybe 15 min earlier than this
267	2022-11-20 09:50:00	wake_up	\N	
268	2022-11-21 10:08:00	wake_up	\N	
269	2022-11-22 10:00:00	wake_up	\N	
270	2022-11-23 11:00:00	wake_up	\N	
271	2022-11-24 10:00:00	wake_up	\N	By alarm
272	2022-11-25 09:20:00	wake_up	\N	
273	2022-11-26 08:04:00	wake_up	\N	Earlier
274	2022-11-27 07:43:00	wake_up	\N	Hopefully I'll fall back asleep
275	2022-11-29 09:13:00	wake_up	\N	
276	2022-12-01 10:47:00	wake_up	\N	Up and down for several hours now
277	2022-12-03 08:39:00	wake_up	\N	
278	2022-12-04 10:35:00	wake_up	\N	
279	2022-12-05 10:15:00	wake_up	\N	Maybe a like earlier
280	2022-12-06 10:09:00	wake_up	\N	
281	2022-12-07 10:14:00	wake_up	\N	
282	2022-12-07 10:15:00	wake_up	\N	
283	2022-12-08 09:48:00	wake_up	\N	-15 minutes
284	2022-12-09 09:33:00	wake_up	\N	
285	2022-12-10 09:49:00	wake_up	\N	
286	2022-12-11 10:44:00	wake_up	\N	
287	2022-12-12 10:54:00	wake_up	\N	
288	2022-12-13 08:00:00	wake_up	\N	
289	2022-12-14 08:48:00	wake_up	\N	Had to pee but don't think I'm going back to sleep
290	2022-12-16 09:03:00	wake_up	\N	
291	2022-12-18 11:28:00	wake_up	\N	
292	2022-12-19 11:21:00	wake_up	\N	
293	2022-12-20 10:11:00	wake_up	\N	
294	2022-12-21 10:54:00	wake_up	\N	
295	2022-12-23 10:49:00	wake_up	\N	
296	2022-12-25 09:41:00	wake_up	\N	
297	2022-12-26 10:28:00	wake_up	\N	
301	2023-06-25 10:17:00	wake_up	\N	test notes blah
302	2023-06-25 02:53:00	go_to_sleep	\N	go sleep earlier 
303	2023-06-24 02:39:00	go_to_sleep	\N	too much time looking for vids
305	2023-06-23 10:55:00	wake_up	\N	
306	2023-06-24 11:02:00	wake_up	\N	
169	2022-06-24 11:55:00	wake_up	\N	
\.


--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alecjordan
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 1, false);


--
-- Name: sleep_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alecjordan
--

SELECT pg_catalog.setval('public.sleep_data_id_seq', 306, true);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: alecjordan
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: sleep_data sleep_data_pkey; Type: CONSTRAINT; Schema: public; Owner: alecjordan
--

ALTER TABLE ONLY public.sleep_data
    ADD CONSTRAINT sleep_data_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

