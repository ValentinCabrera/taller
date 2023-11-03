--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.cliente (
    id bigint NOT NULL,
    apellido character varying(30),
    direccion character varying(200),
    estado boolean,
    mail character varying(100),
    nombre character varying(30),
    telefono bigint,
    ultima_visita timestamp(6) without time zone
);


ALTER TABLE public.cliente OWNER TO valentincabrera;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: valentincabrera
--

CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_seq OWNER TO valentincabrera;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: valentincabrera
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: marca; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.marca (
    nombre character varying(30) NOT NULL,
    estado boolean
);


ALTER TABLE public.marca OWNER TO valentincabrera;

--
-- Name: modelo; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.modelo (
    id bigint NOT NULL,
    estado boolean,
    nombre character varying(30),
    marca_nombre character varying(30)
);


ALTER TABLE public.modelo OWNER TO valentincabrera;

--
-- Name: modelo_id_seq; Type: SEQUENCE; Schema: public; Owner: valentincabrera
--

CREATE SEQUENCE public.modelo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modelo_id_seq OWNER TO valentincabrera;

--
-- Name: modelo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: valentincabrera
--

ALTER SEQUENCE public.modelo_id_seq OWNED BY public.modelo.id;


--
-- Name: orden; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.orden (
    id bigint NOT NULL,
    descripcion character varying(1000),
    estado boolean,
    cliente_id bigint,
    vehiculo_patente character varying(7)
);


ALTER TABLE public.orden OWNER TO valentincabrera;

--
-- Name: orden_id_seq; Type: SEQUENCE; Schema: public; Owner: valentincabrera
--

CREATE SEQUENCE public.orden_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orden_id_seq OWNER TO valentincabrera;

--
-- Name: orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: valentincabrera
--

ALTER SEQUENCE public.orden_id_seq OWNED BY public.orden.id;


--
-- Name: ordenservicio; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.ordenservicio (
    orden_id bigint NOT NULL,
    servicio_id character varying(100) NOT NULL
);


ALTER TABLE public.ordenservicio OWNER TO valentincabrera;

--
-- Name: servicio; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.servicio (
    nombre character varying(100) NOT NULL,
    estado boolean
);


ALTER TABLE public.servicio OWNER TO valentincabrera;

--
-- Name: tecnico; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.tecnico (
    id bigint NOT NULL,
    apellido character varying(30),
    estado boolean,
    nombre character varying(30),
    telefono bigint
);


ALTER TABLE public.tecnico OWNER TO valentincabrera;

--
-- Name: tecnico_id_seq; Type: SEQUENCE; Schema: public; Owner: valentincabrera
--

CREATE SEQUENCE public.tecnico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tecnico_id_seq OWNER TO valentincabrera;

--
-- Name: tecnico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: valentincabrera
--

ALTER SEQUENCE public.tecnico_id_seq OWNED BY public.tecnico.id;


--
-- Name: vehiculo; Type: TABLE; Schema: public; Owner: valentincabrera
--

CREATE TABLE public.vehiculo (
    patente character varying(7) NOT NULL,
    "año" integer,
    estado boolean,
    cliente_id bigint,
    modelo_id bigint
);


ALTER TABLE public.vehiculo OWNER TO valentincabrera;

--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: modelo id; Type: DEFAULT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.modelo ALTER COLUMN id SET DEFAULT nextval('public.modelo_id_seq'::regclass);


--
-- Name: orden id; Type: DEFAULT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.orden ALTER COLUMN id SET DEFAULT nextval('public.orden_id_seq'::regclass);


--
-- Name: tecnico id; Type: DEFAULT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.tecnico ALTER COLUMN id SET DEFAULT nextval('public.tecnico_id_seq'::regclass);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.cliente (id, apellido, direccion, estado, mail, nombre, telefono, ultima_visita) FROM stdin;
1	López	Calle A, 123	t	cliente1@email.com	María	5551112233	2023-10-30 21:10:44.542557
3	González	Calle C, 789	t	cliente3@email.com	Luisa	5553334455	2023-10-30 21:10:44.542557
4	Pérez	Avenida D, 1011	t	cliente4@email.com	Carlos	5554445566	2023-10-30 21:10:44.542557
5	Rodríguez	Calle E, 1213	t	cliente5@email.com	Ana	5555556677	2023-10-30 21:10:44.542557
7	Díaz	Calle G, 1617	t	cliente7@email.com	Laura	5557778899	2023-10-30 21:10:44.542557
8	Fernández	Avenida H, 1819	t	cliente8@email.com	Pedro	5558889910	2023-10-30 21:10:44.542557
9	Ramírez	Calle I, 2021	t	cliente9@email.com	Sofía	5559900011	2023-10-30 21:10:44.542557
10	Torres	Avenida J, 2223	t	cliente10@email.com	David	5550011122	2023-10-30 21:10:44.542557
2	Martínez	Avenida B, 456	f	cliente2@email.com	Juan	5552223344	2023-10-30 21:10:44.542557
6	Sánchez	Avenida F, 1415	f	cliente6@email.com	Miguel	5556667788	2023-10-30 21:10:44.542557
\.


--
-- Data for Name: marca; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.marca (nombre, estado) FROM stdin;
Ford	t
Chevrolet	t
Honda	t
Nissan	t
Hyundai	t
Mercedes-Benz	t
BMW	t
Audi	t
Lexus	t
Porsche	t
Subaru	t
Kia	t
Mazda	t
Peugeot	t
Ferrari	t
Lamborghini	t
Aston Martin	t
Bentley	t
Toyota	t
Volkswagen	t
Fast	f
Few	f
Dad	t
Safe	t
\.


--
-- Data for Name: modelo; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.modelo (id, estado, nombre, marca_nombre) FROM stdin;
1	t	Corolla	Toyota
2	t	Camry	Toyota
4	t	Highlander	Toyota
5	t	Prius	Toyota
6	t	Golf	Volkswagen
7	t	Passat	Volkswagen
8	t	Jetta	Volkswagen
9	t	Tiguan	Volkswagen
10	t	Atlas	Volkswagen
11	t	F-150	Ford
12	t	Mustang	Ford
13	t	Escape	Ford
14	t	Explorer	Ford
15	t	Focus	Ford
16	t	Silverado	Chevrolet
17	t	Malibu	Chevrolet
18	t	Equinox	Chevrolet
19	t	Camaro	Chevrolet
20	t	Traverse	Chevrolet
21	t	Civic	Honda
22	t	Accord	Honda
23	t	CR-V	Honda
24	t	Pilot	Honda
25	t	Fit	Honda
26	t	Altima	Nissan
27	t	Maxima	Nissan
28	t	Rogue	Nissan
29	t	Pathfinder	Nissan
30	t	Sentra	Nissan
31	t	Sonata	Hyundai
32	t	Elantra	Hyundai
33	t	Tucson	Hyundai
34	t	Santa Fe	Hyundai
35	t	Kona	Hyundai
36	t	C-Class	Mercedes-Benz
37	t	E-Class	Mercedes-Benz
38	t	GLC	Mercedes-Benz
39	t	S-Class	Mercedes-Benz
40	t	GLA	Mercedes-Benz
41	t	3 Series	BMW
42	t	5 Series	BMW
43	t	X3	BMW
44	t	X5	BMW
45	t	M3	BMW
46	t	A3	Audi
47	t	A4	Audi
48	t	Q5	Audi
49	t	Q7	Audi
50	t	S5	Audi
51	t	ES	Lexus
52	t	RX	Lexus
53	t	IS	Lexus
54	t	NX	Lexus
55	t	LS	Lexus
56	t	911	Porsche
57	t	Cayenne	Porsche
58	t	Panamera	Porsche
59	t	Macan	Porsche
60	t	718	Porsche
61	t	Outback	Subaru
62	t	Forester	Subaru
63	t	Impreza	Subaru
64	t	Crosstrek	Subaru
65	t	WRX	Subaru
66	t	Sorento	Kia
67	t	Optima	Kia
68	t	Sportage	Kia
69	t	Forte	Kia
70	t	Soul	Kia
71	t	Mazda3	Mazda
72	t	Mazda6	Mazda
73	t	CX-5	Mazda
74	t	MX-5 Miata	Mazda
75	t	CX-9	Mazda
76	t	208	Peugeot
77	t	308	Peugeot
78	t	2008	Peugeot
79	t	3008	Peugeot
80	t	5008	Peugeot
81	t	488 GTB	Ferrari
82	t	Portofino	Ferrari
83	t	812 Superfast	Ferrari
84	t	F8 Tributo	Ferrari
85	t	Roma	Ferrari
86	t	Huracán	Lamborghini
87	t	Aventador	Lamborghini
88	t	Urus	Lamborghini
89	t	Countach	Lamborghini
90	t	Diablo	Lamborghini
91	t	DB11	Aston Martin
92	t	Vantage	Aston Martin
93	t	DBS Superleggera	Aston Martin
94	t	Rapide	Aston Martin
95	t	Valhalla	Aston Martin
96	t	Continental GT	Bentley
97	t	Bentayga	Bentley
98	t	Flying Spur	Bentley
99	t	Mulsanne	Bentley
100	t	Azure	Bentley
101	f	Kicks	Nissan
3	f	RAV4	Toyota
102	t	Prueba	Safe
\.


--
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.orden (id, descripcion, estado, cliente_id, vehiculo_patente) FROM stdin;
3		t	1	FDJ324
4	No anda el auto	t	4	FDJ324
5		f	9	JKL423
\.


--
-- Data for Name: ordenservicio; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.ordenservicio (orden_id, servicio_id) FROM stdin;
3	Diagnóstico de fallas
5	Servicio de aire acondicionado
4	Servicio de aire acondicionado
4	Cambio de correa de distribución
4	Reemplazo de batería
\.


--
-- Data for Name: servicio; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.servicio (nombre, estado) FROM stdin;
Reparación de transmisión	t
Cambio de neumáticos	t
Reparación de sistema de escape	t
Diagnóstico de fallas	t
Servicio de aire acondicionado	t
Cambio de correa de distribución	t
Reemplazo de batería	t
Limpieza de inyectores	t
Cambio de aceite de caja de cambios	t
Reparación de sistemas de suspensión	t
Servicio de frenos antibloqueo (ABS)	t
Alineación de dirección asistida	t
Cambio de filtro de aire	t
Reparación de sistema eléctrico	t
Servicio de inmovilizador de arranque	t
Reparación de sistemas de dirección	t
Reparación de sistemas de suspensión neumática	t
Servicio de frenos de emergencia	t
Reemplazo de bujías de encendido	t
Cambio de bujes de rueda	t
Ajuste de válvulas del motor	t
Servicio de climatización y calefacción	t
Diagnóstico de sistemas de seguridad	t
Reparación de sistemas de escape de alto rendimiento	t
Lubricación de chasis y componentes	t
Alineación y balanceo	f
Cambio de aceite y filtro	t
Cambio de bujías	f
Reparación de motor	f
Cambio de frenos	f
\.


--
-- Data for Name: tecnico; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.tecnico (id, apellido, estado, nombre, telefono) FROM stdin;
1	González	t	Carlos	5551234567
2	Martínez	t	Luisa	5552345678
4	Sánchez	t	Miguel	5554567890
5	Pérez	t	Laura	5555678901
3	Rodríguez	f	Ana	5553456789
\.


--
-- Data for Name: vehiculo; Type: TABLE DATA; Schema: public; Owner: valentincabrera
--

COPY public.vehiculo (patente, "año", estado, cliente_id, modelo_id) FROM stdin;
VFD834	2002	t	7	1
JKL423	2023	f	8	11
FDJ324	1999	t	10	54
\.


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: valentincabrera
--

SELECT pg_catalog.setval('public.cliente_id_seq', 50, true);


--
-- Name: modelo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: valentincabrera
--

SELECT pg_catalog.setval('public.modelo_id_seq', 102, true);


--
-- Name: orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: valentincabrera
--

SELECT pg_catalog.setval('public.orden_id_seq', 5, true);


--
-- Name: tecnico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: valentincabrera
--

SELECT pg_catalog.setval('public.tecnico_id_seq', 19, true);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (nombre);


--
-- Name: modelo modelo_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (id);


--
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id);


--
-- Name: servicio servicio_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT servicio_pkey PRIMARY KEY (nombre);


--
-- Name: tecnico tecnico_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.tecnico
    ADD CONSTRAINT tecnico_pkey PRIMARY KEY (id);


--
-- Name: vehiculo vehiculo_pkey; Type: CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT vehiculo_pkey PRIMARY KEY (patente);


--
-- Name: vehiculo fk3a2jaiiowm2w628gkqikbvjx6; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT fk3a2jaiiowm2w628gkqikbvjx6 FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


--
-- Name: vehiculo fk7nuti0iilt6bdkh8ujhujvfm6; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.vehiculo
    ADD CONSTRAINT fk7nuti0iilt6bdkh8ujhujvfm6 FOREIGN KEY (modelo_id) REFERENCES public.modelo(id);


--
-- Name: orden fkb2v2o9756m127bnufp5322uyf; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT fkb2v2o9756m127bnufp5322uyf FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);


--
-- Name: orden fkews4r6pu0a6fqiucntarsglt1; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT fkews4r6pu0a6fqiucntarsglt1 FOREIGN KEY (vehiculo_patente) REFERENCES public.vehiculo(patente);


--
-- Name: ordenservicio fkhc1r1iu9m8ptird84172idrj2; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.ordenservicio
    ADD CONSTRAINT fkhc1r1iu9m8ptird84172idrj2 FOREIGN KEY (orden_id) REFERENCES public.orden(id);


--
-- Name: modelo fkliker414d4d2g5qrfasijr85m; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT fkliker414d4d2g5qrfasijr85m FOREIGN KEY (marca_nombre) REFERENCES public.marca(nombre);


--
-- Name: ordenservicio fkrxw92df4gkpayc2njhavlx2qq; Type: FK CONSTRAINT; Schema: public; Owner: valentincabrera
--

ALTER TABLE ONLY public.ordenservicio
    ADD CONSTRAINT fkrxw92df4gkpayc2njhavlx2qq FOREIGN KEY (servicio_id) REFERENCES public.servicio(nombre);


--
-- PostgreSQL database dump complete
--

