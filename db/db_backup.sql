--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.3

-- Started on 2021-07-19 22:58:03 EDT

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

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 18093489)
-- Name: follows; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.follows (
    user_fk integer NOT NULL,
    thread_fk integer NOT NULL,
    "timestamp" timestamp without time zone,
    unread boolean
);


--
-- TOC entry 200 (class 1259 OID 18093478)
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    post_fk integer NOT NULL,
    user_fk integer NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 18093481)
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message character varying(1000) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    sender_fk integer NOT NULL,
    recipient_fk integer NOT NULL,
    read boolean,
    deleted boolean,
    subject character varying(64)
);


--
-- TOC entry 202 (class 1259 OID 18093487)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4040 (class 0 OID 0)
-- Dependencies: 202
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 204 (class 1259 OID 18093492)
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    content text,
    "timestamp" timestamp without time zone NOT NULL,
    thread_fk integer NOT NULL,
    user_fk integer NOT NULL,
    last_edited timestamp without time zone
);


--
-- TOC entry 205 (class 1259 OID 18093498)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4041 (class 0 OID 0)
-- Dependencies: 205
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 206 (class 1259 OID 18093500)
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    message text,
    post_fk integer NOT NULL,
    user_fk integer NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 18093506)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4042 (class 0 OID 0)
-- Dependencies: 207
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- TOC entry 208 (class 1259 OID 18093508)
-- Name: threads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.threads (
    id integer NOT NULL,
    category character varying(64) NOT NULL,
    title text,
    "timestamp" timestamp without time zone NOT NULL,
    user_fk integer NOT NULL,
    locked boolean,
    subscribers integer[],
    pinned boolean
);


--
-- TOC entry 209 (class 1259 OID 18093514)
-- Name: threads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.threads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4043 (class 0 OID 0)
-- Dependencies: 209
-- Name: threads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.threads_id_seq OWNED BY public.threads.id;


--
-- TOC entry 210 (class 1259 OID 18093516)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(16) NOT NULL,
    password character varying(128) NOT NULL,
    email character varying(128) NOT NULL,
    date timestamp without time zone NOT NULL,
    status integer,
    session character varying(32),
    quote character varying(128),
    location character varying(32),
    main character varying(32),
    website character varying(128),
    birthday date,
    trophies integer[],
    signature character varying(256)
);


--
-- TOC entry 211 (class 1259 OID 18093522)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4044 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3874 (class 2604 OID 18093524)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3875 (class 2604 OID 18093525)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 3876 (class 2604 OID 18093526)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- TOC entry 3877 (class 2604 OID 18093527)
-- Name: threads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.threads ALTER COLUMN id SET DEFAULT nextval('public.threads_id_seq'::regclass);


--
-- TOC entry 3878 (class 2604 OID 18093528)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3881 (class 2606 OID 18093531)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3883 (class 2606 OID 18093533)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3885 (class 2606 OID 18093535)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 3887 (class 2606 OID 18093537)
-- Name: threads threads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_pkey PRIMARY KEY (id);


--
-- TOC entry 3889 (class 2606 OID 18093539)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3891 (class 2606 OID 18093541)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3893 (class 2606 OID 18093543)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3879 (class 1259 OID 18093544)
-- Name: likes_uindex; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX likes_uindex ON public.likes USING btree (post_fk, user_fk);


--
-- TOC entry 3894 (class 2606 OID 18093545)
-- Name: likes likes_posts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_posts_id_fk FOREIGN KEY (post_fk) REFERENCES public.posts(id);


--
-- TOC entry 3895 (class 2606 OID 18093551)
-- Name: likes likes_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_users_id_fk FOREIGN KEY (user_fk) REFERENCES public.users(id);


--
-- TOC entry 3896 (class 2606 OID 18093556)
-- Name: messages messages_recipient_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_recipient_fk_fkey FOREIGN KEY (recipient_fk) REFERENCES public.users(id);


--
-- TOC entry 3897 (class 2606 OID 18093561)
-- Name: messages messages_sender_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_fk_fkey FOREIGN KEY (sender_fk) REFERENCES public.users(id);


--
-- TOC entry 3900 (class 2606 OID 18093566)
-- Name: posts posts_thread_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_thread_fk_fkey FOREIGN KEY (thread_fk) REFERENCES public.threads(id);


--
-- TOC entry 3901 (class 2606 OID 18093571)
-- Name: posts posts_user_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_fk_fkey FOREIGN KEY (user_fk) REFERENCES public.users(id);


--
-- TOC entry 3902 (class 2606 OID 18093576)
-- Name: reports reports_post_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_post_fk_fkey FOREIGN KEY (post_fk) REFERENCES public.posts(id);


--
-- TOC entry 3903 (class 2606 OID 18093581)
-- Name: reports reports_user_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_user_fk_fkey FOREIGN KEY (user_fk) REFERENCES public.users(id);


--
-- TOC entry 3898 (class 2606 OID 18093586)
-- Name: follows thread_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT thread_fk FOREIGN KEY (thread_fk) REFERENCES public.threads(id);


--
-- TOC entry 3904 (class 2606 OID 18093591)
-- Name: threads threads_user_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_user_fk_fkey FOREIGN KEY (user_fk) REFERENCES public.users(id);


--
-- TOC entry 3899 (class 2606 OID 18093596)
-- Name: follows user_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT user_fk FOREIGN KEY (user_fk) REFERENCES public.users(id);


-- Completed on 2021-07-19 22:58:06 EDT

--
-- PostgreSQL database dump complete
--

