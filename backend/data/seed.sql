--
-- PostgreSQL database dump
--

\restrict xmroBvSdmNbhRZclyidtoKZzrba1WQkugt0f4MzeCJUWLgvTU54CNnksSFAnUOB

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-03-11 16:38:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5016 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, category, created_at, image_data, image_type) FROM stdin;
2	ordi portable	Informatique	2026-03-07 08:52:50.006067	\N	\N
6	Casque Beats	Audio	2026-03-07 10:14:50.46107	\N	\N
7	Pull Tricoter	Mode	2026-03-07 10:30:00.144402	\N	\N
9	Gourde d'eau 2L	Sport	2026-03-07 10:33:38.420529	\N	\N
8	Moniteur QD OLED	Informatique	2026-03-07 10:32:38.28021	\N	\N
18	Bose QuietComfort 45	Audio	2026-03-10 09:00:00	\N	\N
19	JBL Flip 6	Audio	2026-03-10 11:00:00	\N	\N
20	Dell XPS 15	Informatique	2026-03-10 09:00:00	\N	\N
21	iPad Pro M2	Informatique	2026-03-10 10:00:00	\N	\N
22	Logitech MX Master 3	Informatique	2026-03-10 11:00:00	\N	\N
23	Adidas Ultraboost 23	Sport	2026-03-10 09:00:00	\N	\N
24	Polar Vantage V3	Sport	2026-03-10 10:00:00	\N	\N
25	Levi's 501 Original	Mode	2026-03-10 09:00:00	\N	\N
26	Uniqlo Ultra Light Down	Mode	2026-03-10 10:00:00	\N	\N
27	New Balance 550	Mode	2026-03-10 11:00:00	\N	\N
28	Dyson V15 Detect	Maison	2026-03-10 09:00:00	\N	\N
29	IKEA KALLAX 4x4	Maison	2026-03-10 10:00:00	\N	\N
\.


--
-- TOC entry 5018 (class 0 OID 16401)
-- Dependencies: 222
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, product_id, text, rating, sentiment, sentiment_score, created_at) FROM stdin;
61	2	Il chauffe un trop en rendu 3D et impossible de continuer	5	négatif	0.5229	2026-03-07 14:58:25.397312
62	2	Les port USB sont nombreux et pratiques	5	positif	0.5433	2026-03-07 14:58:40.47997
63	2	L''écran est parfois fatiguant après plusieurs heures	3	neutre	0.4309	2026-03-07 14:58:48.69066
64	2	La webcam ne se déclenche pas bien parfois	2	négatif	0.4318	2026-03-07 14:58:56.245508
65	2	Le clavier mécanique ajoute une touche premium	4	positif	0.5758	2026-03-07 14:59:07.321479
66	2	Les mises à jour Windows sont rapides	5	positif	0.4828	2026-03-07 14:59:15.105454
67	2	Rapport qualité/prix globalement bon malgré le poids	4	positif	0.5815	2026-03-07 14:59:21.589352
57	2	Vraiment puissant pour mes tâches de code	5	positif	0.6797	2026-03-07 14:57:36.935583
58	2	La batterie tient bien sur ma journée complète	4	positif	0.476	2026-03-07 14:57:44.163449
78	6	L'application du casque n'est pas compatible pour les Android	3	positif	0.8177	2026-03-08 15:18:16.747468
59	2	Le pavé numérique est un peu rigide	3	neutre	0.5532	2026-03-08 10:57:50.808869
70	6	Très confortables après 4 heures d''utilisation	5	positif	0.9459	2026-03-07 15:15:20.036957
72	6	Isolation sonore marche trop bien pour le travail, j'arrive a mieux me concentrer	5	positif	0.8006	2026-03-07 15:16:26.889249
117	9	Le design est moderne et le matériau se lave bien	5	positif	0.9824	2026-03-07 15:29:22.816331
119	9	Je sens toujours un goût de plastique dans l''eau, pas agréable	5	positif	0.9385	2026-03-07 15:29:44.61644
120	9	C''est léger à transporter en randonnée sans poids	5	positif	0.9473	2026-03-07 15:29:52.032149
121	9	Le couvercle ne se ferme pas parfaitement quand haut	3	négatif	0.6295	2026-03-07 15:30:01.908911
122	9	L''étanchéité a failli en journée de pluie	2	négatif	0.8128	2026-03-07 15:30:15.575172
124	9	Il tient la main bien même en tenant le bouchon	4	positif	0.8852	2026-03-07 15:30:36.809515
104	8	Le contraste est incroyable pour le gaming nocturne	5	positif	0.6784	2026-03-07 15:26:30.70806
73	6	La connectivité Bluetooth coupe parfois	3	négatif	0.9421	2026-03-08 10:16:39.785781
74	6	J''ai mal à l''oreille gauche avec l''écouteur	2	négatif	0.9163	2026-03-08 10:17:14.454045
76	6	Le micro est clair même avec du bruit	4	positif	0.8917	2026-03-08 10:17:34.049685
79	6	Excellent rapport qualité prix globalement	4	positif	0.9998	2026-03-08 10:18:40.031035
80	6	Design épuré qui passe dans toutes les tenues	4	positif	0.7575	2026-03-08 10:18:49.500084
81	6	Le design est un peu trop cher pour le rendu	3	positif	0.9783	2026-03-08 10:18:57.234415
82	6	Les coussinets sentent la moisi après 6 mois	2	négatif	0.7882	2026-03-08 10:19:23.222793
95	7	La matière est douce contre la peau	5	positif	0.7089	2026-03-07 15:24:31.351675
98	7	Les couleurs sont moins vives que sur l'image	3	positif	0.9202	2026-03-07 15:25:12.927234
99	7	Très chaud en hiver facile à enfiler	4	positif	0.5103	2026-03-07 15:25:26.539298
100	7	La couture du col s''effiloche après lavage	2	négatif	0.7281	2026-03-07 15:25:34.391816
101	7	Il est un peu trop grand pour coupe classique	3	positif	0.981	2026-03-07 15:25:51.77667
102	7	Le coloris a changé légèrement sans souci	4	positif	0.983	2026-03-07 15:26:08.837688
103	7	Il s''agrippe bien pour les mouvements rapides	4	positif	0.8483	2026-03-07 15:26:14.806436
115	9	Le bouchon est très hermétique aucune fuite	5	positif	0.6676	2026-03-07 15:29:07.456158
116	9	La paille est parfois trop petite pour boire rapidement	3	positif	0.9368	2026-03-07 15:29:15.970684
106	8	Les couleurs sont fidèles sans trop de lumière bleu pour pas abîmer les yeux, surtout pour un gameur c'est top !	5	positif	0.997	2026-03-07 15:27:18.845982
107	8	Il est un peu épais donc il prend beaucoup de place	3	négatif	0.6971	2026-03-07 15:27:32.380915
108	8	Le taux de rafraîchissement rend les jeux fluides	5	positif	0.8809	2026-03-07 15:27:43.948578
109	8	Pixel mort après 2 mois d''utilisation	1	positif	0.6245	2026-03-07 15:27:54.013998
110	8	Le pied supporte bien le clavier sans s''effriter	4	négatif	0.9662	2026-03-07 15:28:01.482052
111	8	L''écran est parfaitement réglé pour montage vidéo	5	négatif	0.9453	2026-03-07 15:28:14.256783
112	8	Je dois tourner la lumière pour ne pas fatiguer mes yeux	3	positif	0.8248	2026-03-07 15:28:26.97443
113	8	Les ports HDMI sont bien accessibles derrière	4	positif	0.5206	2026-03-07 15:28:35.974276
114	8	Très élégant sur mon bureau avec ses lignes rondes	5	positif	0.9866	2026-03-07 15:28:48.893754
127	19	Son puissant pour sa taille, parfait pour la plage	5	positif	0.94	2026-01-19 10:00:00
128	19	Résistant à l eau, je l ai utilisé sous la douche sans problème	5	positif	0.91	2026-01-20 11:00:00
129	19	Basses très présentes, idéal pour la musique électronique	4	positif	0.85	2026-01-21 14:00:00
130	19	Le son grésille légèrement à volume maximum	2	négatif	0.77	2026-01-22 09:00:00
131	19	La batterie se décharge vite, à peine 8h en pratique	2	négatif	0.8	2026-01-23 15:00:00
132	19	Pas de prise jack, uniquement bluetooth, dommage	3	neutre	0.61	2026-01-24 10:00:00
133	19	Bon rapport qualité prix pour une enceinte portable	4	positif	0.83	2026-01-25 12:00:00
134	18	Réduction de bruit impressionnante, encore mieux que mon ancien casque	5	positif	0.96	2026-01-11 10:00:00
135	18	Très confortable, je peux le porter toute la journée sans douleur	5	positif	0.93	2026-01-12 11:00:00
136	18	Son équilibré et naturel, parfait pour la musique classique	4	positif	0.87	2026-01-13 14:00:00
137	18	La batterie tient environ 24h, suffisant pour un long voyage	4	positif	0.81	2026-01-14 09:00:00
138	18	Le micro est médiocre pour les appels, ma voix sonne robotique	2	négatif	0.82	2026-01-15 16:00:00
139	18	Se déconnecte du bluetooth quand je passe près du micro-ondes	2	négatif	0.79	2026-01-16 10:00:00
140	18	Prix très élevé, difficile à justifier face à la concurrence	3	neutre	0.63	2026-01-17 13:00:00
141	20	Écran OLED magnifique, les couleurs sont éclatantes	5	positif	0.97	2026-01-06 09:00:00
142	20	Performances excellentes pour le montage vidéo 4K	5	positif	0.95	2026-01-07 10:00:00
143	20	Chauffe énormément sous charge, le ventilateur est très bruyant	1	négatif	0.91	2026-01-08 14:00:00
144	20	La batterie tient à peine 5h en utilisation normale	2	négatif	0.85	2026-01-09 09:00:00
145	20	Le clavier est agréable mais les touches sont un peu petites	3	neutre	0.6	2026-01-10 11:00:00
146	20	Port USB-C uniquement, besoin d un hub pour tout brancher	2	négatif	0.78	2026-01-11 15:00:00
147	20	Design ultra fin et léger, très beau produit	5	positif	0.92	2026-01-12 09:00:00
148	21	Écran Liquid Retina XDR absolument sublime pour le dessin	5	positif	0.98	2026-01-09 10:00:00
149	21	Performances du M2 bluffantes, aucune latence avec Procreate	5	positif	0.96	2026-01-10 11:00:00
150	21	Apple Pencil vendu séparément, c est scandaleux pour ce prix	1	négatif	0.9	2026-01-11 14:00:00
151	21	iPadOS reste limité par rapport à macOS, frustrant	2	négatif	0.83	2026-01-12 09:00:00
152	21	Batterie excellente, tient facilement 10h	5	positif	0.93	2026-01-13 15:00:00
153	21	Face ID fonctionne même couché, très pratique	4	positif	0.86	2026-01-14 10:00:00
154	21	Prix très élevé pour une tablette sans clavier ni stylet inclus	2	négatif	0.81	2026-01-15 13:00:00
155	22	La molette MagSpeed est une révolution, défile 1000 lignes en un instant	5	positif	0.97	2026-01-13 10:00:00
156	22	Ergonomie parfaite, ma main ne fatigue plus après 8h de travail	5	positif	0.95	2026-01-14 11:00:00
157	22	Connexion stable sur 3 appareils différents, le switch est instantané	5	positif	0.93	2026-01-15 14:00:00
158	22	La charge USB-C dure toute la semaine, excellent	4	positif	0.88	2026-01-16 09:00:00
159	22	Le logiciel Logi Options+ plante régulièrement sous Windows 11	2	négatif	0.8	2026-01-17 15:00:00
160	22	Un peu lourde pour une utilisation prolongée sur tapis fin	3	neutre	0.62	2026-01-18 10:00:00
161	22	Meilleure souris que j ai jamais utilisée, vaut chaque centime	5	positif	0.96	2026-01-19 12:00:00
162	23	Amorti incroyable, on a l impression de courir sur des nuages	5	positif	0.97	2026-01-21 10:00:00
163	23	Très légères, parfaites pour les longues distances	5	positif	0.94	2026-01-22 11:00:00
164	23	Design élégant, je les porte aussi au quotidien	4	positif	0.86	2026-01-23 14:00:00
165	23	La semelle s use très vite, moins de 400km et déjà dégradée	2	négatif	0.84	2026-01-24 09:00:00
166	23	Taille grand, commander une demi-pointure en dessous	2	négatif	0.77	2026-01-25 15:00:00
167	23	Pas très respirantes par forte chaleur, les pieds transpirent	3	neutre	0.64	2026-01-26 10:00:00
168	23	Excellent maintien de la voûte plantaire, plus de douleurs	5	positif	0.92	2026-01-27 12:00:00
169	24	GPS extrêmement précis, même en forêt dense	5	positif	0.96	2026-01-23 10:00:00
170	24	Analyse de la récupération très utile pour adapter l entraînement	5	positif	0.94	2026-01-24 11:00:00
171	24	Batterie tient 40h en mode GPS, parfait pour les ultra-trails	5	positif	0.95	2026-01-25 14:00:00
172	24	Le capteur cardiaque optique est imprécis lors des sprints	2	négatif	0.81	2026-01-26 09:00:00
173	24	L interface de la montre est lente et peu intuitive	2	négatif	0.79	2026-01-27 15:00:00
174	24	Prix très élevé, difficile à justifier face à Garmin	3	neutre	0.6	2026-01-28 10:00:00
175	24	Bracelet inconfortable après 2h de sport, laisse des marques	2	négatif	0.76	2026-01-29 12:00:00
176	25	Coupe iconique, s adapte à tous les styles	5	positif	0.94	2026-02-02 10:00:00
177	25	Denim de qualité, solide et qui vieillit bien	5	positif	0.92	2026-02-03 11:00:00
178	25	La taille est très aléatoire selon les lots, commandez et comparez	2	négatif	0.81	2026-02-04 14:00:00
179	25	Rétréci après le premier lavage malgré les consignes respectées	2	négatif	0.85	2026-02-05 09:00:00
180	25	Le tissu est un peu raide au début mais s assouplît avec le temps	3	neutre	0.62	2026-02-06 15:00:00
181	25	Couleur indigo profonde, très belle en raw denim	5	positif	0.9	2026-02-07 10:00:00
182	25	Coutures solides, pas de défauts visibles après 1 an de port	4	positif	0.87	2026-02-08 12:00:00
183	26	Incroyablement légère pour sa chaleur, se range dans sa poche	5	positif	0.96	2026-02-06 10:00:00
184	26	Parfaite comme couche intermédiaire sous un manteau	5	positif	0.93	2026-02-07 11:00:00
185	26	Rapport qualité prix imbattable pour une doudoune	4	positif	0.88	2026-02-08 14:00:00
186	26	Le tissu fait du bruit en marchant, très gênant	2	négatif	0.79	2026-02-09 09:00:00
187	26	Les coutures ont lâché après 2 saisons, plumes qui s échappent	1	négatif	0.88	2026-02-10 15:00:00
188	26	Coupe un peu ample, préférer une taille en dessous	3	neutre	0.6	2026-02-11 10:00:00
189	27	Design rétro magnifique, toujours des compliments dans la rue	5	positif	0.95	2026-02-11 10:00:00
190	27	Cuir de qualité, se patine très bien avec le temps	5	positif	0.93	2026-02-12 11:00:00
191	27	Très polyvalentes, aussi bien avec un jean qu un jogging	4	positif	0.87	2026-02-13 14:00:00
192	27	Taille petit, prendre une taille au dessus	2	négatif	0.78	2026-02-14 09:00:00
193	27	Semelle intérieure trop fine, inconfortable après 2h de marche	2	négatif	0.81	2026-02-15 15:00:00
194	27	Coloris blanc se salit rapidement, difficile à entretenir	3	neutre	0.63	2026-02-16 10:00:00
195	27	Emblème N très bien fini, finitions soignées sur toute la chaussure	4	positif	0.85	2026-02-17 12:00:00
196	28	Aspiration puissante, détecte vraiment la poussière invisible	5	positif	0.97	2026-02-16 10:00:00
197	28	Le laser révèle une quantité de poussière hallucinante sur parquet	5	positif	0.95	2026-02-17 11:00:00
198	28	Très léger et maniable, nettoyage rapide de tout l appartement	4	positif	0.88	2026-02-18 14:00:00
199	28	Bac à poussière trop petit, à vider toutes les 2 pièces	2	négatif	0.81	2026-02-19 09:00:00
200	28	Très bruyant en mode max, impossible d aspirer bébé endormi	2	négatif	0.78	2026-02-20 15:00:00
201	28	Prix excessif, on paie surtout la marque	2	négatif	0.83	2026-02-21 10:00:00
202	28	Batterie tient 60min en mode eco, suffisant pour un grand appartement	4	positif	0.86	2026-02-22 12:00:00
203	29	Parfait pour ranger ma collection de vinyles et jeux de société	5	positif	0.93	2026-02-21 10:00:00
204	29	Bon rapport qualité prix, solide pour du mobilier en kit	4	positif	0.87	2026-02-22 11:00:00
205	29	Le montage est long mais la notice est claire et bien illustrée	3	neutre	0.61	2026-02-23 14:00:00
206	29	S affaisse légèrement au centre après 1 an avec des livres lourds	2	négatif	0.8	2026-02-24 09:00:00
207	29	Les coins sont fragiles, attention lors du déménagement	2	négatif	0.76	2026-02-25 15:00:00
208	29	Dimensions parfaites pour les inserts Drona et Kallax, bien pensé	4	positif	0.84	2026-02-26 10:00:00
209	29	Odeur de panneau aggloméré persistante pendant 2 semaines	2	négatif	0.75	2026-02-27 12:00:00
\.


--
-- TOC entry 5024 (class 0 OID 0)
-- Dependencies: 219
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 29, true);


--
-- TOC entry 5025 (class 0 OID 0)
-- Dependencies: 221
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 210, true);


-- Completed on 2026-03-11 16:38:03

--
-- PostgreSQL database dump complete
--

\unrestrict xmroBvSdmNbhRZclyidtoKZzrba1WQkugt0f4MzeCJUWLgvTU54CNnksSFAnUOB

