USE [BazaWiedzyProdukcyjnej];
GO
SET NOCOUNT ON;
DELETE FROM dbo.NoteLinks;
DELETE FROM dbo.Notes;
DELETE FROM dbo.InstanceInformations;
DELETE FROM dbo.ElementInformations;
DELETE FROM dbo.TechInfos;
DELETE FROM dbo.TechTables;
DELETE FROM dbo.Photos;
DELETE FROM dbo.Attachments;
DELETE FROM dbo.Instances;
DELETE FROM dbo.Elements;
DELETE FROM dbo.Departments;
DELETE FROM dbo.TechGroups;
GO
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclcqel8pr5', N'Okrągłe', N'/media/zdjecia/deptphoto_dept_mvovclcqel8pr5.jpg', 0);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovcleim4kta8', N'Spiro', N'/media/zdjecia/deptphoto_dept_mvovcleim4kta8.jpg', 1);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclelm22o3t', N'Proste', N'/media/zdjecia/deptphoto_dept_mvovclelm22o3t.jpg', 2);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclen1u6r0b', N'Spawane', NULL, 3);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclenc4kv1s', N'Wydział specjalny', N'/media/zdjecia/deptphoto_dept_mvovclenc4kv1s.jpg', 4);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclepnnc9xi', N'DBC', N'/media/zdjecia/deptphoto_dept_mvovclepnnc9xi.jpg', 5);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovcleswi1jfc', N'DBC-M', NULL, 6);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclesu7btw9', N'DBC-CS', NULL, 7);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclesuc17ef', N'ARN', NULL, 8);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclesqo2y2y', N'ARN-CS', NULL, 9);
INSERT INTO dbo.Departments (Id, Name, PhotoPath, SortOrder) VALUES (N'dept_mvovclesztxiuf', N'ARN-MOD', NULL, 10);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclct40a5wk', N'dept_mvovclcqel8pr5', N'Krócce okrągłe - bundkragen''y', 0);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcld4nska11', N'dept_mvovclcqel8pr5', N'Kolana segmentowe', 1);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclddtco6m2', N'dept_mvovclcqel8pr5', N'Opaski', 2);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcldhktkgwb', N'dept_mvovclcqel8pr5', N'Nyple okrągłe', 3);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcldmun5n8n', N'dept_mvovclcqel8pr5', N'Przewody okrągłe', 4);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcldr87qfjx', N'dept_mvovclcqel8pr5', N'Mufy', 5);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcldwbime9l', N'dept_mvovclcqel8pr5', N'Przepustnice', 6);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle1550esn', N'dept_mvovclcqel8pr5', N'Redukcje', 7);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle3iekjon', N'dept_mvovclcqel8pr5', N'Kołnierze', 8);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle7nimwxs', N'dept_mvovclcqel8pr5', N'Zasuwy', 9);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle7zu2nyz', N'dept_mvovclcqel8pr5', N'Przejścia dachowe', 10);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle7p27ig6', N'dept_mvovclcqel8pr5', N'Zaślepki', 11);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle7vrpt9c', N'dept_mvovclcqel8pr5', N'Tłumiki', 12);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle8z8xruj', N'dept_mvovclcqel8pr5', N'Połączenia elastyczne', 13);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle8j6qvyc', N'dept_mvovclcqel8pr5', N'Wyrzutnie', 14);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcle84llczy', N'dept_mvovclcqel8pr5', N'Trójniki', 15);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcled0uce9o', N'dept_mvovclcqel8pr5', N'Wyloty powietrza', 16);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcleifcmox9', N'dept_mvovclcqel8pr5', N'Czerpnie', 17);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcleimrqrt3', N'dept_mvovclcqel8pr5', N'Nasadki', 18);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcleiwl7l6s', N'dept_mvovclcqel8pr5', N'Czwórniki', 19);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclelzlhnik', N'dept_mvovcleim4kta8', N'Rura spiro', 20);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenza4tul', N'dept_mvovclelm22o3t', N'Redukcje', 21);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenzcnss6', N'dept_mvovclelm22o3t', N'Kanały', 22);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenideoxq', N'dept_mvovclelm22o3t', N'Kolana', 23);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclen6m3qg4', N'dept_mvovclelm22o3t', N'Tłumiki', 24);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclen9lthqp', N'dept_mvovclelm22o3t', N'Trójniki', 25);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenbab693', N'dept_mvovclelm22o3t', N'Skrzynki', 26);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclen60aui3', N'dept_mvovclelm22o3t', N'Skrzynie tłumiące', 27);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcleni487tj', N'dept_mvovclelm22o3t', N'Zwężki', 28);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclena9s4nh', N'dept_mvovclelm22o3t', N'Zaślepki', 29);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenls8fu1', N'dept_mvovclelm22o3t', N'Wyrzutnie', 30);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclenh7e4q2', N'dept_mvovclelm22o3t', N'Przejścia', 31);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclen5jey44', N'dept_mvovclelm22o3t', N'Wkłady', 32);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclep9ntugf', N'dept_mvovclenc4kv1s', N'Wyrzutnie', 33);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclepls4gyr', N'dept_mvovclenc4kv1s', N'Czerpnie', 34);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclepaqgx9s', N'dept_mvovclenc4kv1s', N'Kompensatory', 35);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovcleplzh9ly', N'dept_mvovclenc4kv1s', N'Przepustnice', 36);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclestwc6w2', N'dept_mvovclepnnc9xi', N'Przepustnice', 37);
INSERT INTO dbo.Elements (Id, DepartmentId, Name, SortOrder) VALUES (N'el_mvovclesq7287j', N'dept_mvovclesu7btw9', N'Czerpnie ścienne', 38);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclcw9t3qnm', N'el_mvovclct40a5wk', N'Króciec okrągły z uszczelką ręczną', N'BK', N'20001', N'BK', 0);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclczf3jm4v', N'el_mvovclct40a5wk', N'Króciec okrągły z uszczelką maszynową', N'BK', N'20001', N'BK', 1);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcld2vlp2i0', N'el_mvovclct40a5wk', N'Króciec okrągły', N'BK', N'20001', N'BK', 2);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcld4rbq7wz', N'el_mvovclct40a5wk', N'Króciec okrągły z dwoma wywinięciami', N'BK-W', N'20000', N'BK-W', 3);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcld45oq4nv', N'el_mvovclct40a5wk', N'Króciec okrągły z siatką', N'BKS', N'20006', N'BKS', 4);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcld41rtr8g', N'el_mvovclct40a5wk', N'Króciec okrągły z siatką i uszczelką', N'BKS', N'20006', N'BKS', 5);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcld7ls4x3x', N'el_mvovcld4nska11', N'Kolano segmentowe z uszczelkami', N'R-BS', N'120', N'R-BS', 6);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldacowm9s', N'el_mvovcld4nska11', N'Kolano segmentowe', N'R-BS', N'120', N'R-BS', 7);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldc3jbd7e', N'el_mvovcld4nska11', N'Kolano segmentowe z wywinięciem', N'R-BS', N'120', N'R-BS', 8);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclddi9e56q', N'el_mvovcld4nska11', N'Kolano wylotowe okrągłe 135° proste', N'KWO2', N'20027', N'KWO2', 9);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclddnnrd3k', N'el_mvovcld4nska11', N'Kolano wylotowe okrągłe 135° proste z uszczelką', N'KWO2', N'20027', N'KWO2', 10);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclddp83y4r', N'el_mvovcld4nska11', N'Kolano segmentowe mufowe', N'R-BS', N'120', N'R-BS', 11);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldddimw9l', N'el_mvovcld4nska11', N'Kolano wylotowe okrągłe 90° z wylotką', N'KWO4', N'20029', N'KWO4', 12);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldd6iavaz', N'el_mvovcld4nska11', N'Kolano wylotowe okrągłe 90° z wylotką z uszczelką', N'KWO4', N'20029', N'KWO4', 13);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldda3bk1r', N'el_mvovcld4nska11', N'Kolano segmentowe redukcyjne', N'RKr', N'122', N'RKr', 14);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclddhx8u13', N'el_mvovcld4nska11', N'Kolano wylotowe okrągłe 125° zacięte', N'KWO1', N'20026', N'KWO1', 15);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclddsuuhq8', N'el_mvovcld4nska11', N'Kolano wylotowe 90°', N'KWO3', N'20028', N'KWO3', 16);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldgp61g3c', N'el_mvovclddtco6m2', N'Opaska szeroka', N'OZS', N'20045', N'OZS', 17);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldgfejsge', N'el_mvovclddtco6m2', N'Opaska zaciskowa-flex', N'OZF', N'90000015', N'OZF', 18);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldhxllw7l', N'el_mvovclddtco6m2', N'Obejma rurowa', NULL, NULL, NULL, 19);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldjxd9g3w', N'el_mvovcldhktkgwb', N'Nypel okrągły z uszczelkami', N'STR', N'20002', N'STR', 20);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldmsvwrxc', N'el_mvovcldhktkgwb', N'Nypel okrągły bez uszczelki', N'STR', N'20002', N'STR', 21);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldo9res4v', N'el_mvovcldmun5n8n', N'Przewód okrągły z wywinięciem', N'ROHR', N'110', N'Rohr', 22);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldox39kmm', N'el_mvovcldmun5n8n', N'Przewód okrągły', N'Rohr', N'110', N'Rohr', 23);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldtbouyxu', N'el_mvovcldr87qfjx', N'Mufa okrągła', N'MFA', N'20003', N'MFA', 24);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldyflimmt', N'el_mvovcldwbime9l', N'Przepustnica szczelna z wywinięciem', N'AKL', N'200005', N'AKL', 25);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldy4b3d6u', N'el_mvovcldwbime9l', N'Przepustnica okrągła z uszczelkami', N'DKE', N'20004', N'DKE', 26);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldylrn2xl', N'el_mvovcldwbime9l', N'Przepustnica okrągła', N'DKE', N'20004', N'DKE', 27);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldynbjckh', N'el_mvovcldwbime9l', N'Przepustnica okrągła szczelna z uszczelkami', N'AKL', N'20005', N'AKL', 28);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldze71mnc', N'el_mvovcldwbime9l', N'Przepustnica okrągła szczelna pod siłownik z uszczelkami', N'AKLM', N'20010', N'AKLs', 29);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldz6kobc5', N'el_mvovcldwbime9l', N'Przepustnica okrągła szczelna z wywinięciem pod siłownik', N'AKLM', N'20010', N'AKLs', 30);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcldzelyjva', N'el_mvovcldwbime9l', N'Przepustnica okrągła szczelna pod siłownik', N'AKLM', N'20010', N'AKLs', 31);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle13o6eba', N'el_mvovcldwbime9l', N'Przepustnica okrągła pod siłownik z wywinięciami', N'DKEM', N'20009', N'DKEs', 32);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle1q76ykb', N'el_mvovcldwbime9l', N'Przepustnica okrągła pod siłownik z uszczelkami', N'DKEM', N'20009', N'DKEs', 33);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle1sghzfi', N'el_mvovcldwbime9l', N'Przepustnica okrągła pod siłownik', N'DKEM', N'20009', N'DKEs', 34);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle35pka40', N'el_mvovcle1550esn', N'Redukcja symetryczna z uszczelkami', N'R-US', N'140', N'R-US', 35);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3hlmo7p', N'el_mvovcle1550esn', N'Redukcja symetryczna', N'R-US', N'140', N'R-US', 36);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3juxbla', N'el_mvovcle1550esn', N'Redukcja symetryczna z wywinięciem', N'R-US', N'140', N'R-US', 37);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle31txwik', N'el_mvovcle1550esn', N'Redukcja asymetryczna z wywinięciem', N'R-UA', N'141', N'R-UA', 38);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3ajezrf', N'el_mvovcle1550esn', N'Redukcja asymetryczna', N'R-UA', N'141', N'R-UA', 39);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3x24akd', N'el_mvovcle1550esn', N'Redukcja asymetryczna z uszczelkami', N'R-UA', N'141', N'R-UA', 40);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3v3n03s', N'el_mvovcle1550esn', N'Redukcja okrągła-owalna symetryczna', N'RO-S', N'150', N'R-OS', 41);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle3ozfrft', N'el_mvovcle1550esn', N'Redukcja symetryczna z uszczelką', N'R-US', N'140', N'R-US', 42);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle6a7tyrn', N'el_mvovcle3iekjon', N'Kołnierz', NULL, NULL, NULL, 43);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7qw2ecb', N'el_mvovcle3iekjon', N'Kołnierz przeciwdeszczowy okrągły 2-częściowy', N'KPO2', N'20042', N'KPO2', 44);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7gle8u3', N'el_mvovcle3iekjon', N'Kołnierz przeciwdeszczowy', NULL, NULL, NULL, 45);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle78ix73s', N'el_mvovcle3iekjon', N'Kołnierz przejścia dachowego (opierzenie)', NULL, NULL, NULL, 46);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7y96x2n', N'el_mvovcle7nimwxs', N'Zasuwa odcinająca balansowa z wywinięciem', N'ZBO', N'20011', N'ZBO', 47);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7kybgcy', N'el_mvovcle7nimwxs', N'Zasuwa prosta z wywinięciem', N'ZPO', N'20012', N'ZPO', 48);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle71c93ma', N'el_mvovcle7nimwxs', N'Zasuwa prosta okrągła', N'ZPO', N'20012', N'ZPO', 49);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7uyy87e', N'el_mvovcle7nimwxs', N'Zasuwa skośna z wywinięciem', N'ZSO', N'20013', N'ZSO', 50);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7q8ye6q', N'el_mvovcle7zu2nyz', N'Przejście dachowe okrągłe izolowane dach płaski', N'POPI', N'20039', N'POPI', 51);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7dh4j1x', N'el_mvovcle7zu2nyz', N'Przejście dachowe okrągłe dach płaski', N'POP', N'20037', N'POP', 52);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7bpnzxi', N'el_mvovcle7zu2nyz', N'Przejście dachowe okrągłe dach skośny', N'POS', N'20038', N'POS', 53);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle78wd8su', N'el_mvovcle7zu2nyz', N'Przejście dachowe izolowane okrągłe dach skośny', N'POSI', N'20040', N'POSI', 54);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle75gbx6c', N'el_mvovcle7zu2nyz', N'Przejście dachowe okrągłe izolowane dach płaski z uszczelkami', N'POPI', N'20039', N'POPI', 55);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7saohym', N'el_mvovcle7zu2nyz', N'Przejście dachowe izolow. okrągłe z uszczelkami dach skośny', N'POSI', N'20040', N'POSI', 56);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle76mjqfy', N'el_mvovcle7zu2nyz', N'Przejście dachowe okrągłe z uszczelkami dach płaski', N'POP', N'20037', N'POP', 57);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7m8bq5r', N'el_mvovcle7p27ig6', N'Zaślepka do rury', N'DRE', N'20007', N'DRE', 58);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle75v7bg5', N'el_mvovcle7p27ig6', N'Zaślepka do kształtki', N'DFA', N'20008', N'DFA', 59);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7n45qil', N'el_mvovcle7p27ig6', N'Zaślepka do rury z uszczelką', NULL, NULL, NULL, 60);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7tzy5ut', N'el_mvovcle7p27ig6', N'Zaślepka do rury z wywinięciem', NULL, NULL, NULL, 61);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7tr1f3j', N'el_mvovcle7p27ig6', N'Zaślepka okrągła', NULL, NULL, NULL, 62);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle7hb3ye6', N'el_mvovcle7p27ig6', N'Zaślepka do kształtki z wywinięciem', NULL, NULL, NULL, 63);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8mp3vn7', N'el_mvovcle7vrpt9c', N'Tłumik hałasu z wywinięciem', NULL, NULL, NULL, 64);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8ahod42', N'el_mvovcle7vrpt9c', N'Tłumik okrągły z uszczelkami', NULL, NULL, NULL, 65);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8uk42b0', N'el_mvovcle7vrpt9c', N'Tłumik okrągły', N'RSDE', N'20015', N'RSD', 66);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8fqmb1d', N'el_mvovcle7vrpt9c', N'Tłumik okrągły z rdzeniem', NULL, NULL, NULL, 67);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8h4vguj', N'el_mvovcle7vrpt9c', N'Tłumik hałasu z rdzeniem z wywinięciem', NULL, NULL, NULL, 68);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8ipcike', N'el_mvovcle7vrpt9c', N'Tłumik okrągły z rdzeniem i uszczelkami', NULL, NULL, NULL, 69);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle80xxiai', N'el_mvovcle8z8xruj', N'Połączenie elastyczne okrągłe 80°', NULL, NULL, NULL, 70);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8ua4ewa', N'el_mvovcle8z8xruj', N'Połączenie elastyczne', NULL, NULL, NULL, 71);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8ln86kn', N'el_mvovcle8j6qvyc', N'Wyrzutnia okrągła typ E', N'WDOE', N'20021', N'WDOs', 72);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8h43e2u', N'el_mvovcle8j6qvyc', N'Wyrzutnia lamelowa okrągła', N'WLO', N'20030', N'WLO', 73);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8q5h2na', N'el_mvovcle8j6qvyc', N'Wyrzutnia okrągła typ E wąska', N'WDOW', N'20022', N'WODw', 74);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8ctshc1', N'el_mvovcle8j6qvyc', N'Wyrzutnia okrągła typ E wąska z uszczelką', N'WDOW', N'20022', N'WDOw', 75);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle80vj82m', N'el_mvovcle8j6qvyc', N'Wyrzutnia okrągła typ E z uszczelką', N'WDOE', N'20021', N'WDOs', 76);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle8umfvrt', N'el_mvovcle8j6qvyc', N'Wyrzutnia lamelowa okrągła z uszczelką', N'WLO', N'20030', N'WLO', 77);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcle89bfo2x', N'el_mvovcle8j6qvyc', N'Wyrzutnia dachowa okrągła typ E z wywinięciem', N'WDOE', N'20021', N'WDOs', 78);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleb9aplsm', N'el_mvovcle84llczy', N'Trójnik', N'R-TS', N'170', N'R-TS', 79);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleb06z2wj', N'el_mvovcle84llczy', N'Trójnik z uszczelkami', N'R-TS', N'170', N'R-TS', 80);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclebb4near', N'el_mvovcle84llczy', N'Trójnik okrągły - spodnie', N'R-YS', N'180', N'R-YS', 81);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcledp0wd3y', N'el_mvovcle84llczy', N'Trójnik "spodnie" symetryczny z wywinięciem', N'R-YS', N'180', N'R-YS', 82);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcled4dl8wb', N'el_mvovcle84llczy', N'Trójnik z wywinięciem', N'R-TS', N'170', N'R-TS', 83);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcled7l1gk3', N'el_mvovcle84llczy', N'Trójnik redukcyjny', N'R-TA', N'171', N'R-TA', 84);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcledk0by23', N'el_mvovcle84llczy', N'Trójnik redukcyjny z wywinięciem', N'R-TA', N'171', N'R-TA', 85);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcledtsw8ka', N'el_mvovcle84llczy', N'Trójnik "spodnie" symetryczny', N'R-YS', N'180', N'R-YS', 86);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcledj0o467', N'el_mvovcle84llczy', N'Trójnik "spodnie" symetryczny z uszczelkami', N'R-YS', N'180', N'R-YS', 87);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcled8zwiqq', N'el_mvovcle84llczy', N'Trójnik redukcyjny z uszczelkami', N'R-TA', N'171', N'R-TA', 88);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclednml14w', N'el_mvovcle84llczy', N'Trójnik "spodnie" symetryczny z uszczelką', N'R-YS', N'180', N'R-YS', 89);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclegt01rzs', N'el_mvovcled0uce9o', N'Wylot powietrza okrągły 90° z uszczelką', N'WPOP', N'20034', N'WPOP', 90);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleg7dfgsa', N'el_mvovcled0uce9o', N'Wylot powietrza okrągły 90°', N'WPOP', N'20034', N'WPOP', 91);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclei3h6q5z', N'el_mvovcled0uce9o', N'Wylot powietrza okrągły z siatką 45° z uszczelką', N'WPO', N'20033', N'WPO', 92);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclei5ezf8u', N'el_mvovcled0uce9o', N'Wylot powietrza okrągły z siatką 45°', N'WPO', N'20033', N'WPO', 93);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleixogiil', N'el_mvovcled0uce9o', N'Wylot powietrza okrągły 90 stopni z siatką i uszczelką', N'WPOP', N'20034', N'WPOP', 94);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclei58zayv', N'el_mvovcleifcmox9', N'Czerpnia dachowa okrągła typ K z uszczelką', N'CDOK', N'20031', N'CDOK', 95);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleim4v2ri', N'el_mvovcleifcmox9', N'Czerpnia dachowa okrągła typ K', N'CDOK', N'20031', N'CDOK', 96);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleivvl9i6', N'el_mvovcleifcmox9', N'Czerpnia dachowa okrągła typ C', N'CDOC', N'20032', N'CDOC', 97);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleikv23es', N'el_mvovcleimrqrt3', N'Nasadka z platą i uszczelką', NULL, NULL, NULL, 98);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleiohekp2', N'el_mvovcleimrqrt3', N'Nasadka z platą', NULL, NULL, NULL, 99);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclei2vkz1n', N'el_mvovcleimrqrt3', N'Nasadka z platą z wywinięciem', NULL, NULL, NULL, 100);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleidydm1x', N'el_mvovcleiwl7l6s', N'Czwórnik', NULL, NULL, NULL, 101);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclei6twplb', N'el_mvovcleiwl7l6s', N'Czwórnik redukcyjny z wywinięciem', NULL, NULL, NULL, 102);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleiukm63y', N'el_mvovcleiwl7l6s', N'Czwórnik redukcyjny z uszczelkami', NULL, NULL, NULL, 103);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleir1tjoz', N'el_mvovcleiwl7l6s', N'Czwórnik z uszczelkami', NULL, NULL, NULL, 104);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclelbu47b2', N'el_mvovclelzlhnik', N'Rura spiro', N'WFR', N'109', N'WFR', 105);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclel6f5npt', N'el_mvovclelzlhnik', N'Rura spiro z uszczelnieniem', NULL, NULL, NULL, 106);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen02tqt7', N'el_mvovclenza4tul', N'Redukcja asymetryczna ścięta', NULL, NULL, NULL, 107);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenlghng5', N'el_mvovclenza4tul', N'Redukcja asymetryczna', NULL, NULL, NULL, 108);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen6ptrtu', N'el_mvovclenza4tul', N'Redukcja asymetryczna dołem równa', NULL, NULL, NULL, 109);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen8glaql', N'el_mvovclenza4tul', N'Redukcja asymetryczna górą równa', NULL, NULL, NULL, 110);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen4old2s', N'el_mvovclenza4tul', N'Redukcja asymetryczna przodem i dołem równa', NULL, NULL, NULL, 111);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen4j3hun', N'el_mvovclenza4tul', N'Redukcja asymetryczna przodem i górą równa', NULL, NULL, NULL, 112);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenintvjc', N'el_mvovclenza4tul', N'Redukcja asymetryczna przodem równa', NULL, NULL, NULL, 113);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclengkv7f5', N'el_mvovclenza4tul', N'Redukcja asymetryczna tyłem i dołem równa', NULL, NULL, NULL, 114);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen3omnng', N'el_mvovclenza4tul', N'Redukcja asymetryczna tyłem i górą równa', NULL, NULL, NULL, 115);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenljvh3y', N'el_mvovclenza4tul', N'Redukcja asymetryczna tyłem równa', NULL, NULL, NULL, 116);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenewr869', N'el_mvovclenza4tul', N'Redukcja do montażu', NULL, NULL, NULL, 117);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenx8qzy4', N'el_mvovclenza4tul', N'Redukcja symetryczna', NULL, NULL, NULL, 118);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenjon6d8', N'el_mvovclenzcnss6', N'Kanał izolowany', NULL, NULL, NULL, 119);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen6j2fog', N'el_mvovclenzcnss6', N'Kanał prostokątny poniżej 900mm dł.', NULL, NULL, NULL, 120);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen2tuhm0', N'el_mvovclenzcnss6', N'Kanał prostokątny powyżej 900mm dł.', NULL, NULL, NULL, 121);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenbv4x1k', N'el_mvovclenzcnss6', N'Kanał prostokątny z wycięciem', NULL, NULL, NULL, 122);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenq2e8h2', N'el_mvovclenzcnss6', N'Kanał prostokątny, prosty', NULL, NULL, NULL, 123);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenst38rq', N'el_mvovclenzcnss6', N'Kanał SDS-K', NULL, NULL, NULL, 124);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenn7nl2a', N'el_mvovclenzcnss6', N'Kanał ścięty', NULL, NULL, NULL, 125);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenk5d128', N'el_mvovclenzcnss6', N'Kanał ścięty SDS-SK', NULL, NULL, NULL, 126);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenjwdfvh', N'el_mvovclenzcnss6', N'Kanał teleskopowy', NULL, NULL, NULL, 127);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenv7yj3f', N'el_mvovclenzcnss6', N'Kanał tłumiący', NULL, NULL, NULL, 128);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenis8i8o', N'el_mvovclenzcnss6', N'Kanał z wycięciem', NULL, NULL, NULL, 129);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenplqvbt', N'el_mvovclenzcnss6', N'Kanał z zaślepieniem łukowym', NULL, NULL, NULL, 130);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen4475gi', N'el_mvovclenideoxq', N'Kolano asymetryczne', NULL, NULL, NULL, 131);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenlcuf8y', N'el_mvovclenideoxq', N'Kolano asymetryczne bez promienia zew.', NULL, NULL, NULL, 132);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclencxo1n6', N'el_mvovclenideoxq', N'Kolano asymetryczne na płaszczu', NULL, NULL, NULL, 133);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenhvl5af', N'el_mvovclenideoxq', N'Kolano asymetryczne specjalne', NULL, NULL, NULL, 134);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenbtyaij', N'el_mvovclenideoxq', N'Kolano bez promienia zew. ze ścięciem', NULL, NULL, NULL, 135);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleneb420l', N'el_mvovclenideoxq', N'Kolano SDS-WA', NULL, NULL, NULL, 136);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen58dyl6', N'el_mvovclenideoxq', N'Kolano symetryczne', NULL, NULL, NULL, 137);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleny1wwoy', N'el_mvovclenideoxq', N'Kolano symetryczne bez promienia zew.', NULL, NULL, NULL, 138);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclend201bm', N'el_mvovclenideoxq', N'Kolano ścięte', NULL, NULL, NULL, 139);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenr0y72p', N'el_mvovclenideoxq', N'Kolano wylotowe prost. z czerpnią ścienną CS', NULL, NULL, NULL, 140);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenwu2oka', N'el_mvovclenideoxq', N'Kolano wylotowe z siatką', NULL, NULL, NULL, 141);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenougwd3', N'el_mvovclen6m3qg4', N'Tłumik', NULL, NULL, NULL, 142);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen10kad5', N'el_mvovclen6m3qg4', N'Tłumik do regulatora', NULL, NULL, NULL, 143);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenxua921', N'el_mvovclen6m3qg4', N'Tłumik z blachą rezonansową', NULL, NULL, NULL, 144);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenn9glls', N'el_mvovclen6m3qg4', N'Tłumik z mijanką i perforką na wkładach', NULL, NULL, NULL, 145);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleniv29yz', N'el_mvovclen6m3qg4', N'Tłumik z perforką na wkładach', NULL, NULL, NULL, 146);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenzxz5tc', N'el_mvovclen6m3qg4', N'Tłumik z wkładami wysyłanymi oddzielnie', NULL, NULL, NULL, 147);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenv3e5j1', N'el_mvovclen9lthqp', N'Trójnik prosty', NULL, NULL, NULL, 148);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen2wze0u', N'el_mvovclen9lthqp', N'Trójnik SDS-HA', NULL, NULL, NULL, 149);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenq9026y', N'el_mvovclen9lthqp', N'Trójnik SDS-HS', NULL, NULL, NULL, 150);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen0hah7k', N'el_mvovclen9lthqp', N'Trójnik SDS-TR1', NULL, NULL, NULL, 151);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenm6k6pg', N'el_mvovclen9lthqp', N'Trójnik spodnie', NULL, NULL, NULL, 152);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclentng16a', N'el_mvovclen9lthqp', N'Trójnik spodnie asymetryczny', NULL, NULL, NULL, 153);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenactgkb', N'el_mvovclen9lthqp', N'trójnik spodnie asymetryczny z wydłużanym dzieleniem', NULL, NULL, NULL, 154);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenm8ptmv', N'el_mvovclen9lthqp', N'Trójnik spodnie z wydłużanym dzieleniem', NULL, NULL, NULL, 155);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclendn29jk', N'el_mvovclen9lthqp', N'Trójnik ścięty', NULL, NULL, NULL, 156);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen0z6i9n', N'el_mvovclenbab693', N'Skrzynka na rurę / Trójnik z uszczelką', NULL, NULL, NULL, 157);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenm747un', N'el_mvovclenbab693', N'Skrzynka na rurę/ Trójnik', NULL, NULL, NULL, 158);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenlqgjqt', N'el_mvovclenbab693', N'Skrzynka rozdzielacz', NULL, NULL, NULL, 159);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclencf0xay', N'el_mvovclenbab693', N'Skrzynka rozprężna odejście boczne', NULL, NULL, NULL, 160);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclengs8mz5', N'el_mvovclenbab693', N'Skrzynka rozprężna odejście górne', NULL, NULL, NULL, 161);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen4n0ocj', N'el_mvovclenbab693', N'Skrzynka rozprężna odejście górne z przepustnicą', NULL, NULL, NULL, 162);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen5nj5t3', N'el_mvovclenbab693', N'Skrzynka rozprężna z przepustnicą', NULL, NULL, NULL, 163);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenndznp4', N'el_mvovclenbab693', N'SDSAB -S-FD skrzynka izolowana', NULL, NULL, NULL, 164);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenljwddc', N'el_mvovclen60aui3', N'Skrzynia tłumiąca', NULL, NULL, NULL, 165);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenr1ba38', N'el_mvovcleni487tj', N'Zwężka koło-prostikąt-koło', NULL, NULL, NULL, 166);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen6banxh', N'el_mvovcleni487tj', N'Zwężka SDS-RA', NULL, NULL, NULL, 167);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclengx9yww', N'el_mvovcleni487tj', N'Zwężka SDS-RS', NULL, NULL, NULL, 168);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclennp0bnx', N'el_mvovcleni487tj', N'Zwężka SDS-UA', NULL, NULL, NULL, 169);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclena5fkhc', N'el_mvovcleni487tj', N'Zwężka SDS-US', NULL, NULL, NULL, 170);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen0ywitp', N'el_mvovclena9s4nh', N'Zaślepka', NULL, NULL, NULL, 171);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen708l7a', N'el_mvovclena9s4nh', N'Zaślepka płaska', NULL, NULL, NULL, 172);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenlsi22a', N'el_mvovclena9s4nh', N'Zaślepka SDS-BO', NULL, NULL, NULL, 173);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclengksv4w', N'el_mvovclena9s4nh', N'Zaślepka z króćcem prostokątnym', NULL, NULL, NULL, 174);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenkx6eu6', N'el_mvovclena9s4nh', N'Zaślepka z wycięciem / wycięciami', NULL, NULL, NULL, 175);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenkuo4zw', N'el_mvovclenls8fu1', N'Wyrzutnia dachowa typ B', NULL, NULL, NULL, 176);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclennbftrl', N'el_mvovclenls8fu1', N'Wyrzutnia dachowa typ E', NULL, NULL, NULL, 177);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclennszee9', N'el_mvovclenls8fu1', N'Wyrzutnia lamelowa', NULL, NULL, NULL, 178);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclendmbr0b', N'el_mvovclenls8fu1', N'Wyrzutnia samozamykająca kanałowa', NULL, NULL, NULL, 179);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen7kjn0v', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne dach płaski', NULL, NULL, NULL, 180);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenvbavbm', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne dach skośny', NULL, NULL, NULL, 181);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenazewpt', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne dwuścienne dach płaski', NULL, NULL, NULL, 182);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenixfcvl', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne dwuścienne dach skośny', NULL, NULL, NULL, 183);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclendnd6z5', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne izolowane armaflex dach', NULL, NULL, NULL, 184);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenve19uk', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne izolowane dach płaski', NULL, NULL, NULL, 185);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenigen12', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne izolowane dach skośny', NULL, NULL, NULL, 186);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleno4v4my', N'el_mvovclenh7e4q2', N'Przejście dachowe prostokątne izolowane dwuścienne', NULL, NULL, NULL, 187);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenoucn0m', N'el_mvovclenh7e4q2', N'Przejście dachowe z dodatkową maskownicą', NULL, NULL, NULL, 188);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenjqm18n', N'el_mvovclenh7e4q2', N'Przejście prostokąt-koło asymetryczne', NULL, NULL, NULL, 189);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen24ccfl', N'el_mvovclenh7e4q2', N'Przejście prostokąt-koło symetryczne', NULL, NULL, NULL, 190);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen7j3sfa', N'el_mvovclenh7e4q2', N'Przejście prostokąt-koło ścięte asymetryczne', NULL, NULL, NULL, 191);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenqd3guq', N'el_mvovclen5jey44', N'Wkład tłumika', NULL, NULL, NULL, 192);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenbipc58', N'el_mvovclen5jey44', N'Wkład tłumika z blachą perforowaną', NULL, NULL, NULL, 193);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclenex1yj0', N'el_mvovclen5jey44', N'Wkład tłumika z blachą rezonansową', NULL, NULL, NULL, 194);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclen60letd', N'el_mvovclen5jey44', N'Wkład tłumika z blachą rezonansową i perforką', NULL, NULL, NULL, 195);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclep3437g3', N'el_mvovclep9ntugf', N'Wyrzutnia samozamykająca ścienna', NULL, NULL, NULL, 196);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclephn7abw', N'el_mvovclep9ntugf', N'Wyrzutnia samozamykająca kanałowa', NULL, NULL, NULL, 197);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclepkkmwp8', N'el_mvovclepls4gyr', N'Czerpnia ścienna', NULL, NULL, NULL, 198);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclepbg57ww', N'el_mvovclepls4gyr', N'Czerpnia ścienna dwustronna', NULL, NULL, NULL, 199);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclepnepi38', N'el_mvovclepls4gyr', N'Czerpnia ścienna małe pióra', NULL, NULL, NULL, 200);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclep923d04', N'el_mvovclepls4gyr', N'Czerpnia ścienna pionowa (pionowe lamele)', NULL, NULL, NULL, 201);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclep9bwsax', N'el_mvovclepaqgx9s', N'Kompensator oddymiający', NULL, NULL, NULL, 202);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleppq4kw2', N'el_mvovclepaqgx9s', N'Kompensator prostokątny oddymiający typ BKE', NULL, NULL, NULL, 203);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesf30v67', N'el_mvovclestwc6w2', N'Przepustnica Exhaust', NULL, NULL, NULL, 204);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesy9jnro', N'el_mvovclestwc6w2', N'Przepustnica Return', NULL, NULL, NULL, 205);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesb90ozg', N'el_mvovclestwc6w2', N'Przepustnica Supply dolna', NULL, NULL, NULL, 206);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleslhbtfx', N'el_mvovclestwc6w2', N'Przepustnica Supply środkowa', NULL, NULL, NULL, 207);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesmpawr9', N'el_mvovclestwc6w2', N'Przepustnica Supply górna', NULL, NULL, NULL, 208);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesjay55w', N'el_mvovclestwc6w2', N'Przepustnica wielopłaszczyznowa ALU/ szczelna na cięgnach', NULL, NULL, NULL, 209);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesyszki3', N'el_mvovclestwc6w2', N'Przepustnica wielopł. ocynkowana/ na cięgnach', NULL, NULL, NULL, 210);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesn4blss', N'el_mvovclestwc6w2', N'Przepustnica wielopł.alu szczelna pióra alu/koła zębate', NULL, NULL, NULL, 211);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovclesizdwpi', N'el_mvovclesq7287j', N'Czerpnia ścienna', NULL, NULL, NULL, 212);
INSERT INTO dbo.Instances (Id, ElementId, Name, IndexCode, WinKlima, Skrot, SortOrder) VALUES (N'inst_mvovcleswvsfcf', N'el_mvovclesq7287j', N'Czerpnia ścienna pionowa (pionowe lamele)', NULL, NULL, NULL, 213);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovclcwpudyxn', N'el_mvovclct40a5wk', N'Źródło materiału', N'Manual okrągłe', 0, 0);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovclcwdiw4nv', N'el_mvovclct40a5wk', N'Elementy składowe', N'Pasek blachy, ew. siatka / uszczelka', 0, 1);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcld79khnap', N'el_mvovcld4nska11', N'Źródło materiału', N'Laser / manual okrągłe', 0, 2);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcld7hsx7db', N'el_mvovcld4nska11', N'Sposób łączenia segmentów', N'Dla kolan < ø160 - żłobienie + zgrzewanie segmentów
Dla kolan > ø160 - łączenie segmentów na kolanówce', 0, 3);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcld74tqwl9', N'el_mvovcld4nska11', N'Sposób montażu siatki', N'Dla kolan < ø160 - siatka zgrzewana do wywinięcia
Dla kolan > ø160 - siatka mocowana kielichowo', 0, 4);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcld75wv41j', N'el_mvovcld4nska11', N'Elementy składowe', N'Segmenty kolan, ew. uszczelka / siatka', 0, 5);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldgnt1qwv', N'el_mvovclddtco6m2', N'Źródło materiału', N'Manual okrągłe', 0, 6);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldgkgnp6c', N'el_mvovclddtco6m2', N'Elementy składowe', N'Pasek szer. 53mm
Z receptur: uchwyty opaski, śruba, podkładka, nakrętka.', 0, 7);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldjv8k0m4', N'el_mvovcldhktkgwb', N'Źródło materiału', N'Manual okrągłe', 0, 8);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldjrcu19m', N'el_mvovcldhktkgwb', N'Różnica między mufą a nyplem', N'Mufa - wymiar zewnętrzny - nachodzi na element
Nypel - wymiar wewnętrzny - wchodzi w element', 0, 9);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldo0oj9l3', N'el_mvovcldmun5n8n', N'Źródło materiału', N'Manual okrągłe', 0, 10);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldoiysibt', N'el_mvovcldmun5n8n', N'Sposoby łączenia', N'Zgrzewanie punktowe
Zgrzewanie liniowe
Łączenie hakfeltz

Do zgrzewania liniowego felcowanie nie jest wykonywane.', 0, 11);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldtxg5x3v', N'el_mvovcldr87qfjx', N'Źródło materiału', N'Manual okrągłe', 0, 12);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldtgmsjec', N'el_mvovcldr87qfjx', N'Różnica między mufą a nyplem', N'Mufa - wymiar zewnętrzny - nachodzi na element
Nypel - wymiar wewnętrzny - wchodzi w element', 0, 13);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldyld040v', N'el_mvovcldwbime9l', N'Źródło materiału', N'Manual okrągłe - wzmocnienia
Magazyn - elementy mechanizmu
Laser - klapa i płaszcz', 0, 14);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldyr10wi4', N'el_mvovcldwbime9l', N'Wzmacnianie dużych przepustnic', N'Duże przepustnice są dodatkowo spawane na wzmocnieniach klapy.', 0, 15);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldyn7besn', N'el_mvovcldwbime9l', N'Szczelność', N'Przepustnice szczelne = klapa z uszczelką.

Kitowanie, czyszczenie wlotów, foliowanie wlotów zależne od klasy szczelności.', 0, 16);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcldyyrhsgi', N'el_mvovcldwbime9l', N'Przepustnice pod siłownik', N'Zależnie od ustaleń klienta siłownik jest montowany, wysyłany luzem albo w ogóle nie jest zamawiany.', 0, 17);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcle3l0prnv', N'el_mvovcle1550esn', N'Źródło materiału', N'Laser - redukcja
Manual okrągłe - paski', 0, 18);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcle3l7l5il', N'el_mvovcle1550esn', N'Montaż bundkragen''ów', N'> ⌀160 - montaż na maszynie 
< ⌀160 - montaż ręczny', 0, 19);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcle7ho4r0z', N'el_mvovcle7p27ig6', N'Źródło materiału', N'Zaślepka z lasera
Pasek z manual okrągłe', 0, 20);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovcle7dv3oab', N'el_mvovcle7p27ig6', N'Łączenie paska z zaślepką', N'< ∅160 - łączenie poprzez zgrzanie
>∅160 - łączenie kielichowe', 0, 21);
INSERT INTO dbo.ElementInformations (Id, ElementId, Name, Description, Optional, SortOrder) VALUES (N'elinfo_mvovclebtspijp', N'el_mvovcle84llczy', N'Źródło materiału', N'Laser
Manual okrągłe (ewentualne paski)', 0, 22);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclczfouj41', N'inst_mvovclcw9t3qnm', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 0);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclcz4jgkqq', N'inst_mvovclcw9t3qnm', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 1);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclczr8vbvk', N'inst_mvovclcw9t3qnm', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 2);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclcz5bpve6', N'inst_mvovclcw9t3qnm', N'Proces 4', N'Żłobienie pod uszczelkę', 0, N'process', NULL, 3);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclcz1yd5my', N'inst_mvovclcw9t3qnm', N'Proces 5', N'Wywinięcie(board)', 0, N'process', NULL, 4);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclcznilmt8', N'inst_mvovclcw9t3qnm', N'Proces 6', N'Zakładanie uszczelki', 0, N'process', NULL, 5);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclczhwbeds', N'inst_mvovclcw9t3qnm', N'Dodatkowe informacje', N'Jeśli elementy są malowane to uszczelki są zakładane po procesie malowania', 1, N'info', NULL, 6);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclczck91kh', N'inst_mvovclcw9t3qnm', N'Możliwe porcesy', N'Możliwe rozwiercanie otworów w wywinięciu.', 1, N'info', NULL, 7);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld23fqoss', N'inst_mvovclczf3jm4v', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 8);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld2qc6jjg', N'inst_mvovclczf3jm4v', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 9);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld2j4hstj', N'inst_mvovclczf3jm4v', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 10);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld2298xeb', N'inst_mvovclczf3jm4v', N'Proces 4', N'Gumówka', 0, N'process', NULL, 11);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld282vwj6', N'inst_mvovclczf3jm4v', N'Proces 5', N'Wywinięcie(board)', 0, N'process', NULL, 12);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld2lda285', N'inst_mvovclczf3jm4v', N'Gotowy Board z magazynku', N'W magazynku okrągłych znajdują się przygotowywane w wolnej chwili boardy z uszczelką maszynową. Jeśli są potrzebne do zlecenia wymagane jest jedynie wyrównanie blachy i zrobienie wywinięcia.', 0, N'info', NULL, 13);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4pri8fn', N'inst_mvovcld2vlp2i0', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 14);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld402qsvo', N'inst_mvovcld2vlp2i0', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 15);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld40g2v1m', N'inst_mvovcld2vlp2i0', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 16);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4x7glmk', N'inst_mvovcld2vlp2i0', N'Proces 4', N'Wywinięcie(board)', 0, N'process', NULL, 17);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4t4155v', N'inst_mvovcld2vlp2i0', N'Możliwe procesy', N'Możliwe wiercenie otworów w wywinięciu', 1, N'info', NULL, 18);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4e7bqb8', N'inst_mvovcld4rbq7wz', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 19);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4odhw2i', N'inst_mvovcld4rbq7wz', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 20);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4lihrrg', N'inst_mvovcld4rbq7wz', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 21);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4zxzytz', N'inst_mvovcld4rbq7wz', N'Proces 4', N'Wywinięcia (boardy)', 0, N'process', NULL, 22);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld420eug1', N'inst_mvovcld45oq4nv', N'Montaż siatki', N'Dla elementów < ø160 wykonuje się wywinięcie i zgrzewa do niego siatkę. 
Dla elementów > ø160 wykonuje się kielich i zamyka się w nim siatkę.', 0, N'info', NULL, 23);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4i0tbiq', N'inst_mvovcld45oq4nv', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 24);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4dye7r0', N'inst_mvovcld45oq4nv', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 25);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4u0ye3t', N'inst_mvovcld45oq4nv', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 26);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4rr8qwu', N'inst_mvovcld45oq4nv', N'Proces 4', N'Wywinięcie (board)', 0, N'process', NULL, 27);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld415u5z3', N'inst_mvovcld45oq4nv', N'Proces 5', N'Montaż siatki', 0, N'process', NULL, 28);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4fj5ub6', N'inst_mvovcld41rtr8g', N'Montaż siatki', N'Dla elementów < ø160 wykonuje się wywinięcie i zgrzewa do niego siatkę. 
Dla elementów > ø160 wykonuje się kielich i zamyka się w nim siatkę.', 0, N'info', NULL, 29);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4q160ut', N'inst_mvovcld41rtr8g', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 30);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld458a80c', N'inst_mvovcld41rtr8g', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 31);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4rcleom', N'inst_mvovcld41rtr8g', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 32);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld45o0oky', N'inst_mvovcld41rtr8g', N'Proces 4', N'Żłobienie pod uszczelkę', 0, N'process', NULL, 33);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld4s6o905', N'inst_mvovcld41rtr8g', N'Proces 5', N'Montaż siatki', 0, N'process', NULL, 34);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcld463a5w1', N'inst_mvovcld41rtr8g', N'Proces 6', N'Zakładanie uszczelki', 0, N'process', NULL, 35);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclda9ossfv', N'inst_mvovcld7ls4x3x', N'Proces 1', N'Felcowanie segmentu', 0, N'process', NULL, 36);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldac80qhw', N'inst_mvovcld7ls4x3x', N'Proces 2', N'Zwijanie segmentu', 0, N'process', NULL, 37);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldaepafdf', N'inst_mvovcld7ls4x3x', N'Proces 3', N'Zgrzewanie segmentu', 0, N'process', NULL, 38);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclda48ykt8', N'inst_mvovcld7ls4x3x', N'Proces 4', N'Żłobienie odpowiedniego segmentu pod uszczelkę', 0, N'process', NULL, 39);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldayilbu2', N'inst_mvovcld7ls4x3x', N'Proces 5', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 40);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclda2vfhni', N'inst_mvovcld7ls4x3x', N'Proces 6', N'Zakładanie uszczelki', 0, N'process', NULL, 41);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldcqq336b', N'inst_mvovcldacowm9s', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 42);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldcmciuhn', N'inst_mvovcldacowm9s', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 43);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldceka6ex', N'inst_mvovcldacowm9s', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 44);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldc19f9sb', N'inst_mvovcldacowm9s', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 45);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldc6y3vd4', N'inst_mvovcldc3jbd7e', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 46);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldcjmydax', N'inst_mvovcldc3jbd7e', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 47);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldcta80o5', N'inst_mvovcldc3jbd7e', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 48);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldc77awb8', N'inst_mvovcldc3jbd7e', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 49);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddx8hvkc', N'inst_mvovcldc3jbd7e', N'Proces 5', N'Wywinięcie(board)', 0, N'process', NULL, 50);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddbqa0rk', N'inst_mvovcldc3jbd7e', N'Informacja o wywinięciu', N'Wywinięcie może być wykonane przed lub po połączeniu ze sobą segmentów, zależnie od rozmiaru elementu.', 0, N'info', NULL, 51);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd1sw8lw', N'inst_mvovclddi9e56q', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 52);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddc8gged', N'inst_mvovclddi9e56q', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 53);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd2999fo', N'inst_mvovclddi9e56q', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 54);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddnozjmf', N'inst_mvovclddi9e56q', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 55);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddejd8zv', N'inst_mvovclddi9e56q', N'Proces 5', N'Montaż siatki', 0, N'process', NULL, 56);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd5nto8j', N'inst_mvovclddnnrd3k', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 57);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd3d4hrp', N'inst_mvovclddnnrd3k', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 58);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd3w5baa', N'inst_mvovclddnnrd3k', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 59);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddp04nw5', N'inst_mvovclddnnrd3k', N'Proces 4', N'Żłobienie odpowiedniego segmentu pod uszczelkę', 0, N'process', NULL, 60);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd73978e', N'inst_mvovclddnnrd3k', N'Proces 5', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 61);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddmgcv0q', N'inst_mvovclddnnrd3k', N'Proces 6', N'Montaż siatki', 0, N'process', NULL, 62);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddhk6xuv', N'inst_mvovclddnnrd3k', N'Proces 7', N'Zakładanie uszczelki', 0, N'process', NULL, 63);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddpag8oe', N'inst_mvovclddp83y4r', N'Kolano segmentowe z przynajmniej jednym mufowym zakończeniem', N'', 0, N'info', NULL, 64);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd9oykql', N'inst_mvovclddp83y4r', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 65);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddlydk76', N'inst_mvovclddp83y4r', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 66);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddzzovku', N'inst_mvovclddp83y4r', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 67);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd6u6bi8', N'inst_mvovclddp83y4r', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 68);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddvlnohf', N'inst_mvovcldddimw9l', N'Kolano segmentowe zakończone wylotką zamiast paska', N'', 0, N'info', NULL, 69);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddw6kkzu', N'inst_mvovcldddimw9l', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 70);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd9vjzrz', N'inst_mvovcldddimw9l', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 71);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddb27o9i', N'inst_mvovcldddimw9l', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 72);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddgw8wdo', N'inst_mvovcldddimw9l', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 73);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddagzw37', N'inst_mvovcldd6iavaz', N'Kolano segmentowe zakończone wylotką zamiast paska', N'', 0, N'info', NULL, 74);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd45cfzx', N'inst_mvovcldd6iavaz', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 75);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd62zr7f', N'inst_mvovcldd6iavaz', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 76);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddaypx9p', N'inst_mvovcldd6iavaz', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 77);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddendlhs', N'inst_mvovcldd6iavaz', N'Proces 4', N'Żłobienie odpowiedniego segmentu pod uszczelkę', 0, N'process', NULL, 78);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd0i6m0c', N'inst_mvovcldd6iavaz', N'Proces 5', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 79);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddlfr2vr', N'inst_mvovcldd6iavaz', N'Proces 6', N'Zakładanie uszczelki', 0, N'process', NULL, 80);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd9aadd0', N'inst_mvovcldda3bk1r', N'Redukcja za sprawą zakańczających pasków wyżłobionych pod mufę / nypel', N'', 0, N'info', NULL, 81);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddsfhptv', N'inst_mvovcldda3bk1r', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 82);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd1uu806', N'inst_mvovcldda3bk1r', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 83);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddudqak7', N'inst_mvovcldda3bk1r', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 84);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddxqlmgn', N'inst_mvovcldda3bk1r', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 85);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddb71zhg', N'inst_mvovclddhx8u13', N'Kolano zakończone pod skosem z zamontowaną siatką', N'', 0, N'info', NULL, 86);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddby56lq', N'inst_mvovclddhx8u13', N'Proces 1', N'Felcowanie segmentów', 0, N'process', NULL, 87);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddxostkr', N'inst_mvovclddhx8u13', N'Proces 2', N'Zwijanie segmentów', 0, N'process', NULL, 88);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd5wnhjx', N'inst_mvovclddhx8u13', N'Proces 3', N'Zgrzewanie segmentów', 0, N'process', NULL, 89);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclddzurv7g', N'inst_mvovclddhx8u13', N'Proces 4', N'Łączenie segmentów (sposób zależny od rozmiaru)', 0, N'process', NULL, 90);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldd5f1sar', N'inst_mvovclddhx8u13', N'Proces 5', N'Montaż siatki', 0, N'process', NULL, 91);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldg3oou79', N'inst_mvovcldgp61g3c', N'Proces 1', N'Zwijanie', 0, N'process', NULL, 92);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldg7txfml', N'inst_mvovcldgp61g3c', N'Proces 2', N'Felcowanie', 0, N'process', NULL, 93);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldgphnagx', N'inst_mvovcldgp61g3c', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 94);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldgnfk3vq', N'inst_mvovcldgp61g3c', N'Proces 4', N'Żłobienie', 0, N'process', NULL, 95);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldghxjqwg', N'inst_mvovcldgp61g3c', N'Proces 5', N'Zgrzewanie kotew', 0, N'process', NULL, 96);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldhynx32t', N'inst_mvovcldgfejsge', N'Opaska pobierana z magazynu', N'', 0, N'info', NULL, 97);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldmvq17wk', N'inst_mvovcldjxd9g3w', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 98);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldm3ia3ei', N'inst_mvovcldjxd9g3w', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 99);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldmr05rog', N'inst_mvovcldjxd9g3w', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 100);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldm096bky', N'inst_mvovcldjxd9g3w', N'Proces 4', N'Żłobienia, w tym pod uszczelkę (obustronnie)', 0, N'process', NULL, 101);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldmi4nwv9', N'inst_mvovcldjxd9g3w', N'Proces 5', N'Zakładanie uszczelki', 0, N'process', NULL, 102);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldm4jp0yo', N'inst_mvovcldmsvwrxc', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 103);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldm11v4bw', N'inst_mvovcldmsvwrxc', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 104);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldm9604nl', N'inst_mvovcldmsvwrxc', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 105);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldotqklac', N'inst_mvovcldo9res4v', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 106);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldofflbbk', N'inst_mvovcldo9res4v', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 107);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldocpxx5y', N'inst_mvovcldo9res4v', N'Proces 3', N'Zgrzewanie / Hakfeltz', 0, N'process', NULL, 108);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldo60an6s', N'inst_mvovcldo9res4v', N'Proces 4', N'Wywinięcie(board)', 0, N'process', NULL, 109);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldr4ggi4b', N'inst_mvovcldox39kmm', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 110);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldr1qag8u', N'inst_mvovcldox39kmm', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 111);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldrfaibsl', N'inst_mvovcldox39kmm', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 112);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldwd5b9jr', N'inst_mvovcldtbouyxu', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 113);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldwbf84rw', N'inst_mvovcldtbouyxu', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 114);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldwc58u7d', N'inst_mvovcldtbouyxu', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 115);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldw0w2hh6', N'inst_mvovcldtbouyxu', N'Proces 4', N'Żłobienie', 0, N'process', NULL, 116);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyn5txol', N'inst_mvovcldyflimmt', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 117);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldy3pawm5', N'inst_mvovcldyflimmt', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 118);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldycqlfpx', N'inst_mvovcldyflimmt', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 119);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldykf4mu4', N'inst_mvovcldyflimmt', N'Proces 4', N'Wywinięcie (board)', 0, N'process', NULL, 120);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyvulgc5', N'inst_mvovcldyflimmt', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy, montaż rączki)', 0, N'process', NULL, 121);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyx4nwro', N'inst_mvovcldy4b3d6u', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 122);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyijviy1', N'inst_mvovcldy4b3d6u', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 123);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldycq73ed', N'inst_mvovcldy4b3d6u', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 124);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyvlkno3', N'inst_mvovcldy4b3d6u', N'Proces 4', N'Montaż uszczelek na płaszczu', 0, N'process', NULL, 125);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldygic2io', N'inst_mvovcldy4b3d6u', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy, montaż rączki)', 0, N'process', NULL, 126);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyfbnpye', N'inst_mvovcldylrn2xl', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 127);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldy3svwvj', N'inst_mvovcldylrn2xl', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 128);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldy7mrkon', N'inst_mvovcldylrn2xl', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 129);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldyixtj64', N'inst_mvovcldylrn2xl', N'Proces 4', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy, montaż rączki)', 0, N'process', NULL, 130);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz3lh07r', N'inst_mvovcldynbjckh', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 131);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz8de2uv', N'inst_mvovcldynbjckh', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 132);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz8mr9gt', N'inst_mvovcldynbjckh', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 133);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzp7vztu', N'inst_mvovcldynbjckh', N'Proces 4', N'Montaż uszczelek na płaszczu', 0, N'process', NULL, 134);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzwaw2bb', N'inst_mvovcldynbjckh', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy, montaż rączki)', 0, N'process', NULL, 135);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzhuvaas', N'inst_mvovcldze71mnc', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 136);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz0tdo64', N'inst_mvovcldze71mnc', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 137);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz2do4pl', N'inst_mvovcldze71mnc', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 138);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz115ab9', N'inst_mvovcldze71mnc', N'Proces 4', N'Montaż uszczelek na płaszczu', 0, N'process', NULL, 139);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz4094o2', N'inst_mvovcldze71mnc', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 140);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzut1i9n', N'inst_mvovcldze71mnc', N'Proces 6', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 141);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzjg4cvw', N'inst_mvovcldz6kobc5', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 142);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzsarr1v', N'inst_mvovcldz6kobc5', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 143);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzhkhps4', N'inst_mvovcldz6kobc5', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 144);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz8rwm2s', N'inst_mvovcldz6kobc5', N'Proces 4', N'Wywinięcie (board)', 0, N'process', NULL, 145);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldz9ly6ae', N'inst_mvovcldz6kobc5', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 146);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcldzepcxld', N'inst_mvovcldz6kobc5', N'Proces 6', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 147);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle11i8b9w', N'inst_mvovcldzelyjva', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 148);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1uiy83w', N'inst_mvovcldzelyjva', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 149);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1bzsnh1', N'inst_mvovcldzelyjva', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 150);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1grgv3p', N'inst_mvovcldzelyjva', N'Proces 4', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 151);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1x5pc10', N'inst_mvovcldzelyjva', N'Proces 5', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 152);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1a27tlt', N'inst_mvovcle13o6eba', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 153);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1eq7mv8', N'inst_mvovcle13o6eba', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 154);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle10uo82f', N'inst_mvovcle13o6eba', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 155);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1n2vk9v', N'inst_mvovcle13o6eba', N'Proces 4', N'Wywinięcia (boardy)', 0, N'process', NULL, 156);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle12m1i79', N'inst_mvovcle13o6eba', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 157);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1yfmhn9', N'inst_mvovcle13o6eba', N'Proces 6', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 158);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1tecwr9', N'inst_mvovcle1q76ykb', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 159);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1lbgj0i', N'inst_mvovcle1q76ykb', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 160);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1wf7b9b', N'inst_mvovcle1q76ykb', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 161);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1q9aepq', N'inst_mvovcle1q76ykb', N'Proces 4', N'Montaż uszczelek na płaszczu', 0, N'process', NULL, 162);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1ba6sqw', N'inst_mvovcle1q76ykb', N'Proces 5', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 163);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1xhkalz', N'inst_mvovcle1q76ykb', N'Proces 6', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 164);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1uk0f46', N'inst_mvovcle1sghzfi', N'Proces 1', N'Felcowanie płaszcza', 0, N'process', NULL, 165);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1q2fxoi', N'inst_mvovcle1sghzfi', N'Proces 2', N'Zwijanie płaszcza', 0, N'process', NULL, 166);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle12zft4z', N'inst_mvovcle1sghzfi', N'Proces 3', N'Zgrzewanie płaszcza', 0, N'process', NULL, 167);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle14k0ag0', N'inst_mvovcle1sghzfi', N'Proces 4', N'Montaż klapy (łożyska, uzbrojenie klapy, montaż klapy)', 0, N'process', NULL, 168);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle1s9fdlm', N'inst_mvovcle1sghzfi', N'Proces 5', N'Montaż podstawy pod siłownik', 0, N'process', NULL, 169);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle386v7pv', N'inst_mvovcle35pka40', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 170);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle3jftnvd', N'inst_mvovcle35pka40', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 171);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle3jyfjlm', N'inst_mvovcle35pka40', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 172);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle3wp0so9', N'inst_mvovcle35pka40', N'Proces 4', N'Montaż bundkragen''ów z uszczelkami', 0, N'process', NULL, 173);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7c7qupz', N'inst_mvovcle7m8bq5r', N'Proces 1', N'Felcowanie paska', 0, N'process', NULL, 174);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7rpnap7', N'inst_mvovcle7m8bq5r', N'Proces 2', N'Zwijanie paska', 0, N'process', NULL, 175);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7nd8qws', N'inst_mvovcle7m8bq5r', N'Proces 3', N'Zgrzewanie paska', 0, N'process', NULL, 176);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle76bzmpx', N'inst_mvovcle7m8bq5r', N'Proces 4', N'Połączenie paska z zaślepką', 0, N'process', NULL, 177);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7geyxfk', N'inst_mvovcle7n45qil', N'Proces 1', N'Felcowanie paska', 0, N'process', NULL, 178);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7pdc7j6', N'inst_mvovcle7n45qil', N'Proces 2', N'Zwijanie paska', 0, N'process', NULL, 179);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle75ba2z8', N'inst_mvovcle7n45qil', N'Proces 3', N'Zgrzewanie paska', 0, N'process', NULL, 180);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7fnhuh6', N'inst_mvovcle7n45qil', N'Proces 4', N'Montaż uszczelki', 0, N'process', NULL, 181);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7wou556', N'inst_mvovcle7n45qil', N'Proces 5', N'Połączenie paska z zaślepką', 0, N'process', NULL, 182);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7mba1i4', N'inst_mvovcle7tzy5ut', N'Proces 1', N'Felcowanie paska', 0, N'process', NULL, 183);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7zrh5a6', N'inst_mvovcle7tzy5ut', N'Proces 2', N'Zwijanie paska', 0, N'process', NULL, 184);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7v5j1pv', N'inst_mvovcle7tzy5ut', N'Proces 3', N'Zgrzewanie paska', 0, N'process', NULL, 185);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle7bp4uh0', N'inst_mvovcle7tzy5ut', N'Proces 4', N'Wywinięcie (board)', 0, N'process', NULL, 186);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcle75hagpt', N'inst_mvovcle7tzy5ut', N'Proces 5', N'Połączenie paska z zaślepką', 0, N'process', NULL, 187);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcleb6sm5hj', N'inst_mvovcleb9aplsm', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 188);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebul41gl', N'inst_mvovcleb9aplsm', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 189);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebrvkhs6', N'inst_mvovcleb9aplsm', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 190);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebqin3yd', N'inst_mvovcleb9aplsm', N'Proces 4', N'Zgrzewanie nasadki do trójnika', 0, N'process', NULL, 191);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebi6dfuw', N'inst_mvovcleb06z2wj', N'Proces 1', N'Felcowanie', 0, N'process', NULL, 192);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovcleb17vz9c', N'inst_mvovcleb06z2wj', N'Proces 2', N'Zwijanie', 0, N'process', NULL, 193);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebrhupr6', N'inst_mvovcleb06z2wj', N'Proces 3', N'Zgrzewanie', 0, N'process', NULL, 194);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebsn0q9s', N'inst_mvovcleb06z2wj', N'Proces 4', N'Montaż uszczelki', 0, N'process', NULL, 195);
INSERT INTO dbo.InstanceInformations (Id, InstanceId, Name, Description, Optional, Type, PhotoPath, SortOrder) VALUES (N'info_mvovclebsueoto', N'inst_mvovcleb06z2wj', N'Proces 5', N'Zgrzewanie nasadki do trójnika', 0, N'process', NULL, 196);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'elnote_mvovcldokuzu62', N'element', N'el_mvovcldmun5n8n', N'general', N'Łączenie', N'Dla długości powyżej 1000mm zmienić na Hakfaltz 28 (zgrzewarka liniowa ma ograniczenie do długości 1000mm)', NULL, NULL, NULL, N'2026-10-14T08:14:08.900Z', 0);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'elnote_mvovcle7b1hmzk', N'element', N'el_mvovcle7vrpt9c', N'general', N'Elementy składowe', N'Rura wewnętrzna z blachy perforowanej
Wełna / izolacja
Rura zewnętrzna
Zaślepki izolacji
Króćce na szczytach', NULL, NULL, NULL, N'2026-10-12T04:08:00.298Z', 1);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'elnote_mvovcle7ntdov1', N'element', N'el_mvovcle7vrpt9c', N'creation', NULL, N'INSTRUKCJA OGÓLNA
ERP:
Podzlecenia: IZLOLOWANIA, OKRĄGŁE

WINKLIMAX:
1. Wybieramy element w programie i wpisujemy wymiary elementu.
2. W podzleceniu "ZO" robimy zaślepki izolacji (wybierz kołnierz, usuń otwory, wpisz odpowiednie wymiary)', 1, NULL, NULL, N'2026-10-12T04:34:10.004Z', 2);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclczlzr7h6', N'instance', N'inst_mvovclcw9t3qnm', N'instruction', NULL, N'ERP:
Utwórz zlecenie główne okrągłe "ZO"
Podzlecenia: brak

WinKlimax:
Zaciągnij element po numerze i podaj odpowiednią średnicę  oraz długość (patrz "Średnice i długości elementów" w zakładce "Informacje technologiczne").', NULL, NULL, NULL, N'2026-10-22T08:01:02.832Z', 0);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclczxjjxck', N'instance', N'inst_mvovclcw9t3qnm', N'general', N'Odnośniki', N'', NULL, NULL, NULL, N'2026-10-22T08:44:19.017Z', 1);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovclczxjjxck', N'techgroup', N'tgrp_mvovclesn91rx2', 0);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovclczxjjxck', N'techgroup', N'tgrp_mvovclevy101xb', 1);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovclczxjjxck', N'techgroup', N'tgrp_mvovclevpaiu97', 2);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovclczxjjxck', N'techgroup', N'tgrp_mvovclevr63zrz', 3);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcld21mbye7', N'instance', N'inst_mvovclczf3jm4v', N'instruction', NULL, N'Zaciągnij element w WinKlimax po numerze i podaj odpowiednią średnicę (patrz "Średnice elementów" w zakładce "Informacje technologiczne") oraz długość.
Długość elementu wpisujemy według rozpiski długości BK.', NULL, NULL, NULL, N'2026-10-19T04:06:11.347Z', 2);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcld4tgom7y', N'instance', N'inst_mvovcld2vlp2i0', N'instruction', NULL, N'Zaciągnij element w WinKlimax po numerze i podaj odpowiednią średnicę (patrz "Średnice elementów" w zakładce "Informacje technologiczne") oraz długość.
Długość elementu wpisujemy według rozpiski długości BK.', NULL, NULL, NULL, N'2026-10-19T04:06:02.039Z', 3);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcld4uw32ii', N'instance', N'inst_mvovcld4rbq7wz', N'instruction', NULL, N'Zaciągnij element w WinKlimax po numerze i podaj odpowiednią średnicę (patrz "Średnice elementów" w zakładce "Informacje Technologiczne"), długość i wymiary wywinięć (patrz "Wywinięcia" w zakładce "Informacje Technologiczne").
Długość elementu wpisujemy według rozpiski długości BK.', NULL, NULL, NULL, N'2026-10-19T04:07:10.050Z', 4);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcld4pegil2', N'instance', N'inst_mvovcld45oq4nv', N'instruction', NULL, N'Zaciągnij element w WinKlimax po numerze i podaj odpowiednią średnicę (patrz "Średnice elementów" w zakładce "Informacje technologiczne") oraz długość.
Długość elementu wpisujemy według rozpiski długości BK.', NULL, NULL, NULL, N'2026-10-19T04:05:42.424Z', 5);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcld4c4xjm8', N'instance', N'inst_mvovcld41rtr8g', N'instruction', NULL, N'Zaciągnij element w WinKlimax po numerze i podaj odpowiednią średnicę (patrz "Średnice elementów" w zakładce "Informacje technologiczne") oraz długość.
Długość elementu wpisujemy według rozpiski długości BK.', NULL, NULL, NULL, N'2026-10-19T04:05:32.814Z', 6);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldaozukxn', N'instance', N'inst_mvovcld7ls4x3x', N'instruction', NULL, N'ERP:
Zlecenie główne: ZO
Podzlecenia: brak

WinKlimax:
Wprowadź element po numerze WinKlimax i uzupełnij odpowiednio wymiary:
D = średnica kolana według rozpiski ("Informacje Technologiczne -> Średnice i długości elementów")
R1 = standardowo średnica nominalna, chyba że klient określi inaczej w zamówieniu
N = ilość segmentów (przyjmujemy 1 segment na 45°)
GR = stopnie 
E, F = naddatki na wyjściach

NADDATKI EF:
- Dla zakończeń nyplowych / uszczelkowych / mufowych: według rozpiski długości pasków ("Instrukcje Technologiczne - > Długości pasków").
- Dla zakończeń kołnierzowych: E=0, F=0', NULL, NULL, NULL, N'2026-10-22T07:58:53.245Z', 7);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldcc9t2g2', N'instance', N'inst_mvovcldacowm9s', N'instruction', NULL, N'WinKlimax:
Wprowadź element po numerze WinKlimax i uzupełnij odpowiednio wymiary:
D = średnica kolana według rozpiski ("Informacje Technologiczne -> Średnice i długości elementów")
R1 = standardowo średnica nominalna, chyba że klient określi inaczej w zamówieniu
N = ilość segmentów (przyjmujemy 1 segment na 45°)
GR = stopnie 
E, F = naddatki na wyjściach

NADDATKI EF:
- Dla zakończeń nyplowych / uszczelkowych / mufowych: według rozpiski długości pasków ("Instrukcje Technologiczne - > Długości pasków").
- Dla zakończeń kołnierzowych: E=0, F=0', NULL, NULL, NULL, N'2026-10-19T08:48:28.116Z', 8);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldcs580ko', N'instance', N'inst_mvovcldacowm9s', N'creation', NULL, N'R=0,8DN = 128mm, 
90°
Wykonano bez problemu przy 2 segmentach wewnętrznych. 
Niemożliwe do wykonania z 1 segmentem wewnętrznym.', 160, N'Airnotec', N'ZA/005177/26', N'2026-10-19T11:12:18.109Z', 9);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclddz8tcim', N'instance', N'inst_mvovcldc3jbd7e', N'general', N'Wywnięcie', N'Element z wywinięciem - średnica mufowa', NULL, NULL, NULL, N'2026-10-19T08:35:09.542Z', 10);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldd79kbgf', N'instance', N'inst_mvovcldc3jbd7e', N'instruction', NULL, N'WinKlimax:
Wprowadź element po numerze WinKlimax i uzupełnij odpowiednio wymiary:
D = średnica kolana według rozpiski ("Informacje Technologiczne -> Średnice i długości elementów"); kolano z wyw. = średnica mufowa
R1 = standardowo średnica nominalna, chyba że klient określi inaczej w zamówieniu
N = ilość segmentów (przyjmujemy 1 segment na 45°)
GR = stopnie 
E, F = naddatki na wyjściach

NADDATKI EF:
- Dla zakończeń nyplowych / uszczelkowych / mufowych: według rozpiski długości pasków ("Instrukcje Technologiczne - > Długości pasków").
- Dla zakończeń kołnierzowych: E=0, F=0', NULL, NULL, NULL, N'2026-10-19T08:56:51.118Z', 11);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclddvuxcxi', N'instance', N'inst_mvovclddi9e56q', N'instruction', NULL, N'ERP:
Wymagane podzlecenie "ZO".

WinKlimax:
1. W zleceniu głównym dodać element zgodnie z numerem WinKilmax. Wpisać wymiary: A - wg. zamówienia; standard 200mm, D - średnica według zamówienia.
2. W podzleceniu dodać kolano segmentowe (R-BS) z poniższą specyfikacją:
- N = 3 (segmenty),
- GR = 135 (kąt),
- ENTRY = 0,
- E = wartość A ze zlecenia głownego,
- F = 0,
- V1 = zgodnie z zamówieniem,
- V2 = S10 Siatka 10,
- Faltz 1 = Punkten 5-5 (dachowiec)', NULL, NULL, NULL, N'2026-10-20T09:15:53.060Z', 12);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldd0boa65', N'instance', N'inst_mvovclddi9e56q', N'general', N'Elementy składowe', N'Kolano segmentowe (z podzlecenia)
Siatka (z receptur do elementu głównego)', NULL, NULL, NULL, N'2026-10-15T11:54:33.015Z', 13);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclddwfxmt2', N'instance', N'inst_mvovclddnnrd3k', N'general', N'Element uszczelkowy - zmiana w V1', N'Uszczelki schodzą z receptur dla elementu głównego i elementu z podzlecenia.
W elemencie z podzlecenia należy wpisać V1 = LD1b NP LD.
W ten sposób uszczelka nie zejdzie z receptur dla elementu z podzlecenia.', NULL, NULL, NULL, N'2026-10-20T08:56:32.287Z', 14);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldd3avg2k', N'instance', N'inst_mvovclddnnrd3k', N'instruction', NULL, N'ERP:
Wymagane podzlecenie "ZO".

WinKlimax:
1. W zleceniu głównym dodać element zgodnie z numerem WinKilmax. Wpisać wymiary: A - wg. zamówienia; standard 200mm, D - średnica według zamówienia.
2. W podzleceniu dodać kolano segmentowe (R-BS) z poniższą specyfikacją:
- N = 3 (segmenty),
- GR = 135 (kąt),
- ENTRY = 0,
- E = wartość A ze zlecenia głownego,
- F = 0,
- V1 = zgodnie z zamówieniem,
- V2 = S10 Siatka 10,
- Faltz 1 = Punkten 5-5 (dachowiec)', NULL, NULL, NULL, N'2026-10-20T09:16:51.483Z', 15);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldd81xrrm', N'instance', N'inst_mvovclddnnrd3k', N'general', N'Elementy składowe', N'Kolano segmentowe (podzlecenie)
Siatka (z receptur)
Uszczelki (z receptur)', NULL, NULL, NULL, N'2026-10-20T09:17:34.819Z', 16);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldgcbxn0t', N'instance', N'inst_mvovcldgp61g3c', N'instruction', NULL, N'Zaciągnij element według numeru WinKlimax w zleceniu głównym i wpisz szerokość według zamówienia.', NULL, NULL, NULL, N'2026-10-16T09:26:46.802Z', 17);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldhbk2du0', N'instance', N'inst_mvovcldhxllw7l', N'instruction', NULL, N'Element zamawiany z firmy zewnętrznej, wysyłany w zleceniu handlowym "ZH" z magazynu.', NULL, NULL, NULL, N'2026-10-19T06:19:46.560Z', 18);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldyuowuy0', N'instance', N'inst_mvovcldy4b3d6u', N'instruction', NULL, N'ERP:
Wymagane podzlecenie: ZO

WinKlimax:
1. W zleceniu głównym dodaj element po numerze WinKlima. Wpisz odpowiednią średnicę i długość (długość znajdziesz na rozpisce w zakładce "Infromacje Technologiczne -> Średnice i długości elementów").
2. W podzleceniu zapuść elementy z plików DXF ( pliki znajdują się na dysku sieciowym: G:\Biuro\Krzysztof Radke\OKRĄGŁE\DKE):
- rura (wariant bez siłownika)
- przesłona', NULL, NULL, NULL, N'2026-10-20T05:14:25.652Z', 19);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldy2c15ky', N'instance', N'inst_mvovcldy4b3d6u', N'general', N'Elementy składowe', N'- rura (podzlecenie DXF)
- przesłona (podzlecenie DXF)
- Elementy z receptur: pręt gładki, hebel - dźwignia, nitonakrętki, podkładki, śruby, uszczelki.', NULL, NULL, NULL, N'2026-10-20T05:49:45.806Z', 20);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldy4rono4', N'instance', N'inst_mvovcldylrn2xl', N'instruction', NULL, N'ERP:
Wymagane podzlecenie: ZO

WinKlimax:
1. W zleceniu głównym dodaj element po numerze WinKlima. Wpisz odpowiednią średnicę i długość ( rozpiska w zakładce "Infromacje Technologiczne -> Średnice i długości elementów").
2. W podzleceniu zapuść elementy z plików DXF ( pliki znajdują się na dysku sieciowym: G:\Biuro\Krzysztof Radke\OKRĄGŁE\DKE):
- rura (wariant bez siłownika)
- przesłona', NULL, NULL, NULL, N'2026-10-20T05:54:06.940Z', 21);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcldyg972yq', N'instance', N'inst_mvovcldylrn2xl', N'general', N'Elementy składowe', N'- rura (podzlecenie DXF)
- przesłona (podzlecenie DXF)
- Elementy z receptur: pręt gładki, hebel - dźwignia, nitonakrętki, podkładki, śruby.', NULL, NULL, NULL, N'2026-10-20T05:53:28.936Z', 22);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle34tklnp', N'instance', N'inst_mvovcle3hlmo7p', N'general', N'Elementy składowe', N'- Redukcja (wpisana w zleceniu)
- Paski do redukcji ( z receptur według wpisanych V1 i V2)', NULL, NULL, NULL, N'2026-10-19T11:53:02.059Z', 23);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7f7mh76', N'instance', N'inst_mvovcle7qw2ecb', N'instruction', NULL, N'ERP:
Wymagane podzlecenie "ZO".
Element dachowy.

WinKlimax:
1. W zleceniu głównym zaciągnij element według numeru WinKlimax. Wpisz wartość "A" (wywinięcia), średnice D i C oraz długość (L; standard 50mm) 
2. W podzleceniu "ZO" zapuść:
- redukcję symetryczną - V1, V2 = O10 Gladko
- blaszki wzmacniające z pliku DXF (Nowy_g\Biuro\Krzysztof Radke\OKRĄGŁE\1-FIRMY\Blaszki do KPO2). Żeby wybrać odpowiednie blaszki oblicz długość skosu redukcji.', NULL, NULL, NULL, N'2026-10-21T05:39:45.721Z', 24);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle743b0ok', N'instance', N'inst_mvovcle7qw2ecb', N'general', N'Elementy składowe', N'- Redukcja - podzlecenie
- Blaszki wzmacniające (4 blaszki na element) - podzlecenie (DXF) - zawsze grubość blachy 1,2mm
- (opcjonalnie) pasek !Wpisz informację w detalach elementu ze zlecenia głównego!', NULL, NULL, NULL, N'2026-10-21T05:40:42.617Z', 25);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7kwelz5', N'instance', N'inst_mvovcle7q8ye6q', N'instruction', NULL, N'ERP:
Element dachowy - sprawdź w zakładce "Informacje Technologiczne > Dachowce".
Wymagane podzlecenia: ZO, izolowania.

WinKlimax:
Element zaciągamy w WinKlimax według numeru w zleceniu głównym. W zleceniu podrzędnym zaciągamy elementy składowe.

GRUBOŚCI BLACH:
- PLATA I ZAŚLEPKI = 1mm
- POZOSTAŁE ELEMENTY = jeśli automatycznie < 0,8mm -> zmień na 0,8mm', NULL, NULL, NULL, N'2026-10-19T05:27:03.770Z', 26);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7f9afd4', N'instance', N'inst_mvovcle7q8ye6q', N'general', N'Elementy składowe', N'- Rura wewnętrzna (górna i dolna w przypadku różnych wymiarów): średnica według zamówienia
- Rura zewnętrzna: średnica = nominalna średnica rury wew. + 2x wymiar izolacji
- Plata: według zamówienia (standard 150mm od rury zew.)
- Zaślepki izolacji (kołnierz bez otworów): 
    średnica wew. = ørury wew. +1mm, 
    średnica zew. = ørury zew. + naddatek z rozpiski (patrz "Informacje Technologiczne > Zaślepki)', NULL, NULL, NULL, N'2026-10-13T08:09:27.283Z', 27);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7jt3hwj', N'instance', N'inst_mvovcle7dh4j1x', N'general', N'Elementy składowe', N'- Plata (podzlecenie)
- Rura górna (podzlecenie)
- Rura dolna (podzlecenie)', NULL, NULL, NULL, N'2026-10-22T09:40:08.803Z', 28);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovcle7jt3hwj', N'techgroup', N'tgrp_mvovclesn91rx2', 0);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7ec99kk', N'instance', N'inst_mvovcle7dh4j1x', N'instruction', NULL, N'ERP:
Utwórz zlecenie główne okrągłe "ZO".
Podzlecenia: brak.
Element dachowy.

WinKlimax:
1. W zleceniu głównym dodaj element według numeru WinKlimax. Uzupełnij wymiary:
- wymiar platy - średnica rury + 2x długość platy od rury; jeśli nieokreślona w zamówieniu - standard 150mm,
- długość rury dolnej - wg zamówienia
- średnica rury - wg zamówienia,
- długość rury górnej - wg zamówienia
2. W podzleceniu dodaj elementy składowe:
- Plata:  
    średnica otworu = średnica rury - 1mm,
    wymiar platy - wg wymiarów ze zlecenia głównego,
    skos = 0°,
    V1, V2 = 0 Glatt
- Rura górna i rura dolna: średnice i długości wg zamówienia / zlecenia głównego', NULL, NULL, NULL, N'2026-10-22T10:53:41.368Z', 29);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7vphjcm', N'instance', N'inst_mvovcle7dh4j1x', N'general', N'Opcjonalna luźna plata', N'Jeżeli klient zamówił dodatkową platę, zapuszczamy ją w podzleceniu:
- plata: 
    średnica otworu = średnica nominalna + 5mm (+8-10 mm dla ALU),
    wymiary platy - jeśli nieokreślone, takie same jak platy podstawowej,
    reszta danych wg platy podstawowej
- pasek do platy zapuszczony jako rura (Rohr 110):
    średnica = średnica luźnej platy + 1mm,
    długość 50mm,
    V1 = A10 wyw 10', NULL, NULL, NULL, N'2026-10-22T10:37:06.507Z', 30);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7m7uaqn', N'instance', N'inst_mvovcle78wd8su', N'instruction', NULL, N'ERP:
Wymagane podzlecenia: IZOLOWANE, OKRĄŁE
Element dachowy.

Do wykonania poleca się wykonanie rysunku poglądowego w DraftSight.
WinKlimax:
1. W zleceniu głównym zaciągnij główny element po numerze WinKlimax i wpisz wymagane wymiary (więcej informacji w "Uwagi ogólne -> Elementy składowe").
2. W podzleceniu zapuść odpowiednie elementy składowe: plata, rura wewnętrzna, rury ścięte zewnętrzne, zaślepki izolacji.

GRUBOŚCI BLACH:
- PLATA I ZAŚLEPKI = 1mm
- POZOSTAŁE ELEMENTY = jeśli automatycznie < 0,8mm -> zmień na 0,8mm', NULL, NULL, NULL, N'2026-10-16T09:10:28.592Z', 31);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle7asrs9j', N'instance', N'inst_mvovcle78wd8su', N'general', N'Elementy składowe', N'Plata skośna - w podzleceniu:
    - średnica otwory = średnica rury zewnętrznej -1mm
    - wymiar skośny należy obliczyć lub odczytać z wykonanego rysunku
    - wymiar prosty = wymiar rury zew. + 2x wymiar szerokości platy określony przez klienta (jeśli nieokreślony - norma = 150mm)
Rura wewnętrzna - w podzleceniu (średnica według zamówienia; długość = długość izolacji/płaszcza zew. + 2x długość paska według rozpiski pasków)
Rura ścięta zewnętrzna 2szt (góra / dół) - w podzleceniu:
    - średnica = średnica rury wew. +2x wymiar wełny,
    - wywinięcie na stronie ściętej = A10
    - wywinięcie po stronie prostej = A10, chyba że klient określi zakończenie na gładko, wtedy wyw. do środka
Zaślepki izolacji - w podzleceniu (patrz "Informacje Technologiczne" -> "Zaślepki")', NULL, NULL, NULL, N'2026-10-22T08:51:46.994Z', 32);
INSERT INTO dbo.NoteLinks (NoteId, TargetType, TargetId, SortOrder) VALUES (N'instnote_mvovcle7asrs9j', N'techgroup', N'tgrp_mvovclevr63zrz', 0);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle88agr7g', N'instance', N'inst_mvovcle8uk42b0', N'general', N'ELEMENTY SKŁADOWE', N'Rura wewnętrzna z blachy perforowanej - z receptur
Wełna / izolacja - z receptur
Rura zewnętrzna - z receptur
Króćce na szczytach - z receptur
Zaślepki izolacji - zapuścić w podzleceniu:
    - wymiar wewnętrzny = wymiar króćca (wymiar wew. wpisany w elemencie głównym) + 1mm
    - wymiar zewnętrzny = wymiar wewnętrzny + 3mm(rura wew. z perforki) + naddatek według rozpiski w zakładce "Informacje Technologiczne -> Zaślepki")', NULL, NULL, NULL, N'2026-10-19T09:09:12.477Z', 33);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle8ocjp4v', N'instance', N'inst_mvovcle8uk42b0', N'instruction', NULL, N'ERP:
Podzlecenia: IZLOLOWANIA, OKRĄGŁE

WINKLIMAX:
1. Wybieramy element w programie i wpisujemy wymiary elementu.
2. W podzleceniu "ZO" robimy zaślepkę izolacji dla obu stron (wybierz kołnierz, usuń otwory, wpisz odpowiednie wymiary)', NULL, NULL, NULL, N'2026-10-15T11:56:00.410Z', 34);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle8h11r6x', N'instance', N'inst_mvovcle8ln86kn', N'instruction', NULL, N'ERP:
Wymagane podzlecenie: ZO

WinKlimax:
1. W zleceniu głównym wpisz element według numeru WinKlimax. Uzupełnij wymiary: 
- D: średnica według zamówienia, 
- L: długość z rozpiski wymiarów wyrzutni tupu E (patrz zakładkę "Informacje Technologiczne -> Wyrzutnie okrągłe").
2. W podzleceniu zaciągnij elementy z plików DXF (lokalizacja na dysku: Nowy_g\Biuro\Krzysztof Radke\OKRĄGŁE\WDO-E\WDO-E standard):
- pasek górny
- pasek dolny
- redukcja górna
- redukcja dolna
- wanna', NULL, NULL, NULL, N'2026-10-21T05:00:51.328Z', 35);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle8l36n7o', N'instance', N'inst_mvovcle8ln86kn', N'general', N'Elementy składowe', N'- elementy w podzleceniu z DXF: pasek górny, pasek dolny, redukcja górna, redukcja dolna, wanna
- elementy z receptur dla elementu głównego: blacha na wsporniki wanny (3szt), rura, siatka.', NULL, NULL, NULL, N'2026-10-21T08:57:23.547Z', 36);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle82zzpb7', N'instance', N'inst_mvovcle80vj82m', N'instruction', NULL, N'ERP:
Wymagane podzlecenie: ZO

WinKlimax:
1. W zleceniu głównym wpisz element według numeru WinKlimax. Uzupełnij wymiary: 
- D: średnica uszczelkowa według zamówienia, 
- L: długość z rozpiski wymiarów wyrzutni tupu E (patrz zakładkę "Informacje Technologiczne -> Wyrzutnie okrągłe").
2. W podzleceniu zaciągnij elementy z plików DXF (lokalizacja na dysku: Nowy_g\Biuro\Krzysztof Radke\OKRĄGŁE\WDO-E\WDO-E standard):
- pasek górny
- pasek dolny
- redukcja górna
- redukcja dolna
- wanna
I wpisz odpowiednią dla nich grubość blachy (patrz "Informacje Technologiczne -> Wyrzutnie dachowe okrągłe").', NULL, NULL, NULL, N'2026-10-21T10:55:48.522Z', 37);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcle8b46i0z', N'instance', N'inst_mvovcle80vj82m', N'general', N'Elementy składowe', N'- elementy w podzleceniu z DXF: pasek górny, pasek dolny, redukcja górna, redukcja dolna, wanna
- elementy z receptur dla elementu głównego: blacha na wsporniki wanny (3szt), rura, siatka, uszczelka.', NULL, NULL, NULL, N'2026-10-21T08:57:31.709Z', 38);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleb7me1cd', N'instance', N'inst_mvovcleb9aplsm', N'instruction', NULL, N'WinKlimax:
Dodaj element według numeru WinKlimax. Uzupełnij wymiary zgodnie z poniższą instrukcją:
- B: Średnica według zamówienia
- L, H1: Długość trójnika i odejścia odczytaj z rozpiski wymiarów trójników ("Informacje Technologiczne -> Wymiary trójników").
- D1: Średnica według zamówienia.
- M1: Wpisz "0", odejście się wycentruje.', NULL, NULL, NULL, N'2026-10-20T06:37:03.767Z', 39);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcled37bdxx', N'instance', N'inst_mvovcledp0wd3y', N'creation', NULL, N'Średnice 3x 150mm
3x Wyw. 6mm,
Między osiami odejść 0°
Rozstaw odejść 350mm

WinKlimax:
D = 152mm
B, C = 154mm
UB, UC = 98

ERP:
Zmienić wymiar paska z receptur na 485x55mm i grubość na 0,8mm', 150, N'Herbert Heldt KG', N'ZA/005074/26', N'2026-10-19T09:11:47.015Z', 40);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovclei4jjegj', N'instance', N'inst_mvovclei3h6q5z', N'general', N'Elementy składowe', N'- Pasek (z receptur)
- Rura ścięta 45° (w podzleceniu)', NULL, NULL, NULL, N'2026-10-13T11:11:55.782Z', 41);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleivqfr3p', N'instance', N'inst_mvovclei3h6q5z', N'instruction', NULL, N'ERP:
Wymagane podzlecenie "ZO".
Element dachowy - sprawdź w zakładce "Informacje Technologiczne > Dachowce".

WinKlimax:
Dodaj element do zlecenia głównego po numerze WinKlimax.
W podzleceniu ZO dodaj rurę ściętą.', NULL, NULL, NULL, N'2026-10-13T11:15:46.553Z', 42);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleixh5tuu', N'instance', N'inst_mvovclei3h6q5z', N'general', N'Długość elementu', N'Standardowa długość elementu to 100mm. Warto sprawdzić jaki pasek blachy schodzi z receptur dla wykonywanego elementu a następnie dostosować do niego długość rury ściętej, biorąc pod uwagę wykonywane procesy:
- Zakładanie uszczelki na pasku: - ~6mm
- Kielich na pasku: - ~10mm
- Wywinięcie na rurze ściętej: - ~6mm
W zaokrągleniu przyjmujemy - 20mm

100mm - długość paska + 20mm = długość rury ściętej', NULL, NULL, NULL, N'2026-10-13T11:29:23.975Z', 43);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleis7rd94', N'instance', N'inst_mvovcleim4v2ri', N'general', N'Elementy składowe', N'Rura
Daszek
Osłona', NULL, NULL, NULL, N'2026-10-12T07:27:37.432Z', 44);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleikc7gkw', N'instance', N'inst_mvovcleim4v2ri', N'instruction', NULL, N'ERP:
Wymagane podzlecenie okrągłe.
Element dachowy - patrz  "Dachowce" w zakładce Informacje Technologiczne

WinKlimax: 
Dodaj element główny według numeru WinKlimax w zleceniu głównym "ZO" i uzupełnij wymiary zgodnie z zamówieniem.
Składowe elementu zaciągane z rysunków DXF do podzlecenia "ZO". 
Wybierz wariant elementu w folderze na dysku sieciowym (G:\Biuro\Krzysztof Radke\OKRĄGŁE\CDO-K _Dachhaube) i zaciągnij rysunki DXF.', NULL, NULL, NULL, N'2026-10-15T04:51:53.283Z', 45);
INSERT INTO dbo.Notes (Id, Scope, OwnerId, Kind, Name, Description, Diameter, Client, Za, DateUtc, SortOrder) VALUES (N'instnote_mvovcleld6f126', N'instance', N'inst_mvovclelbu47b2', N'instruction', NULL, N'WinKlimax:
Zawsze wpisujemy średnicę nominalną.
Jeśli zamówienie jest na więcej niż 3m rury -> długość jednej rury = 3000mm.', NULL, NULL, NULL, N'2026-10-19T05:35:21.060Z', 46);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclesn91rx2', N'Średnice i długości elementów', 0);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclevcjc3p3', N'Naddatki', 1);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclevy101xb', N'Łączenia blach', 2);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclevpaiu97', N'Dachowce', 3);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclevr63zrz', N'Wymiary zaślepek i zaślepień izolacji', 4);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclexmvka6v', N'Długości pasków', 5);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclezf7o1jc', N'Wymiary trójników', 6);
INSERT INTO dbo.TechGroups (Id, Name, SortOrder) VALUES (N'tgrp_mvovclf21skgkj', N'Długości redukcji', 7);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclestq2xvi', N'tgrp_mvovclesn91rx2', N'Średnice elementów nyplowych', N'Tabela średnic elementów nyplowych i uszczelkowych oraz długości elementów znajdują się poniżej i w pliku "Tabela średnic" na dysku sieciowym: G:\Biuro\Krzysztof Radke\OKRĄGŁE', 0, 0);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclesjk96ts', N'tgrp_mvovclesn91rx2', N'Średnice elementów mufowych', N'Dla elementów mufowych do średnicy nominalnej dodajemy 1mm.
Dla powiększonej mufy na rurę dodajemy 4mm do średnicy nominalnej.
Dla powiększonej mufy na rurę spiro dodajemy według rozpiski w pliku "Przygotowania Produkcji 2014".', 0, 1);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclesev9x2e', N'tgrp_mvovclesn91rx2', N'Długości elementów', N'W tabeli średnic elementów znajduje się również rozpiska długości dla elementów:
- BK
- STR
- MFA
- BK/U (Bundkragen z uszczelką)
- STR/U (Nypel z uszczelką)
- DKE
- AKL', 0, 2);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclev6o0bji', N'tgrp_mvovclevcjc3p3', N'Naddatki na końcach - elementy okrągłe', N'A6 wyw. 6
A10 wyw. 10
KP10 Kolnierz 10
MF Mufa
NP Nypel
LD Nypel LD
S10 Siatka
O Gladko
0 Glatt', 0, 3);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclevtwxas2', N'tgrp_mvovclevy101xb', N'Łączenia blach - elementy okrągłe', N'Punkten 3:3
Punkten 5-5
Hakfaltz 28
Mbogenfaltz
Bogenfaltz 7/4
Bogenfaltz 10/4', 0, 4);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclevandg81', N'tgrp_mvovclevpaiu97', N'Tworzenie zlecenia - dachowce', N'Przy tworzeniu zlecenia wybierz odpowiednio:
Norma WK - Okrągłe B C
Klasa WK - Wetterfest
Norma:
    - Jeśli elementy z uszczelkami - C1o
    - Jeśli elementy bez uszczelek - C0o', 0, 5);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclev3bzkpo', N'tgrp_mvovclevr63zrz', N'Zaślepki', N'Rozpiska średnic kół do zaślepek znajduje się poniżej i na dysku sieciowym: G:\Biuro\Krzysztof Radke\OKRĄGŁE plik PDF "koła do zaślepek"', 0, 6);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclevf1d3vh', N'tgrp_mvovclevr63zrz', N'Zaślepienia izlolacji', N'Zaślepienia izolacji wykonujemy z elementu o numerze WinKlimax 105 (Flanschring - Kołnierz) usuwając wszystkie otwory. 
Średnica wewnętrzna odpowiada średnicy elementu, na który nakładana będzie zaślepka + 1mm. 
Średnicę zewnętrzną wybieramy odpowiednio z rozpiski "koła do zaślepek" (patrz wpis "Zaślepki" powyżej)', 0, 7);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclezqq4icg', N'tgrp_mvovclezf7o1jc', N'Długość trójnika (L)', N'Do długości z poniższej tabelki należy dodać 2x długość paska dla średnicy wejścia i wyjścia trójnika.', 0, 8);
INSERT INTO dbo.TechInfos (Id, GroupId, Name, Description, Optional, SortOrder) VALUES (N'tinfo_mvovclf2ig2j1v', N'tgrp_mvovclf21skgkj', N'Rozpiska długości średnic', N'Poniżej znajduje się rozpiska długości średnic.', 0, 9);
INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (N'ttab_mvovcletw2y4mi', N'tgrp_mvovclesn91rx2', N'Tabela średnic i długości elementów okrągłych', N'2026-10-20T07:22:13.059Z', NULL, N'ttab_mvovcletw2y4mi.json', 0);
INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (N'ttab_mvovclev3qwgo5', N'tgrp_mvovclevr63zrz', N'Wymiary kół do zaślepek', N'2026-10-20T07:45:54.731Z', NULL, N'ttab_mvovclev3qwgo5.json', 1);
INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (N'ttab_mvovclex7efay8', N'tgrp_mvovclexmvka6v', N'Długości pasków', N'2026-10-20T10:19:53.213Z', NULL, N'ttab_mvovclex7efay8.json', 2);
INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (N'ttab_mvovclf094m01z', N'tgrp_mvovclezf7o1jc', N'Wymiary trójników', N'2026-10-20T10:20:35.230Z', NULL, N'ttab_mvovclf094m01z.json', 3);
INSERT INTO dbo.TechTables (Id, GroupId, Name, DateUtc, SourceFileName, DataFileName, SortOrder) VALUES (N'ttab_mvovclf2hljto2', N'tgrp_mvovclf21skgkj', N'Tabela długości redukcji według różnicy średnic', N'2026-10-20T09:33:31.669Z', NULL, N'ttab_mvovclf2hljto2.json', 4);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_0', N'element', N'el_mvovclct40a5wk', N'el_el_mvovclct40a5wk_0.jpg', N'/media/zdjecia/el_el_mvovclct40a5wk_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_1', N'element', N'el_mvovcld4nska11', N'el_el_mvovcld4nska11_0.jpg', N'/media/zdjecia/el_el_mvovcld4nska11_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_2', N'element', N'el_mvovclddtco6m2', N'el_el_mvovclddtco6m2_0.jpg', N'/media/zdjecia/el_el_mvovclddtco6m2_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_3', N'element', N'el_mvovcldhktkgwb', N'el_el_mvovcldhktkgwb_0.jpg', N'/media/zdjecia/el_el_mvovcldhktkgwb_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_4', N'element', N'el_mvovcldmun5n8n', N'el_el_mvovcldmun5n8n_0.jpg', N'/media/zdjecia/el_el_mvovcldmun5n8n_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_5', N'element', N'el_mvovcldr87qfjx', N'el_el_mvovcldr87qfjx_0.jpg', N'/media/zdjecia/el_el_mvovcldr87qfjx_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_6', N'element', N'el_mvovcldwbime9l', N'el_el_mvovcldwbime9l_0.jpg', N'/media/zdjecia/el_el_mvovcldwbime9l_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_7', N'element', N'el_mvovcle1550esn', N'el_el_mvovcle1550esn_0.jpg', N'/media/zdjecia/el_el_mvovcle1550esn_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_8', N'element', N'el_mvovcle3iekjon', N'el_el_mvovcle3iekjon_0.jpg', N'/media/zdjecia/el_el_mvovcle3iekjon_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_9', N'element', N'el_mvovcle84llczy', N'el_el_mvovcle84llczy_0.jpg', N'/media/zdjecia/el_el_mvovcle84llczy_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_el_10', N'element', N'el_mvovcled0uce9o', N'el_el_mvovcled0uce9o_0.jpg', N'/media/zdjecia/el_el_mvovcled0uce9o_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_11', N'instance', N'inst_mvovclcw9t3qnm', N'inst_inst_mvovclcw9t3qnm_0.jpg', N'/media/zdjecia/inst_inst_mvovclcw9t3qnm_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_12', N'instance', N'inst_mvovclczf3jm4v', N'inst_inst_mvovclczf3jm4v_0.jpg', N'/media/zdjecia/inst_inst_mvovclczf3jm4v_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_13', N'instance', N'inst_mvovcld2vlp2i0', N'inst_inst_mvovcld2vlp2i0_0.jpg', N'/media/zdjecia/inst_inst_mvovcld2vlp2i0_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_14', N'instance', N'inst_mvovcld7ls4x3x', N'inst_inst_mvovcld7ls4x3x_0.jpg', N'/media/zdjecia/inst_inst_mvovcld7ls4x3x_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_15', N'instance', N'inst_mvovcldacowm9s', N'inst_inst_mvovcldacowm9s_0.jpg', N'/media/zdjecia/inst_inst_mvovcldacowm9s_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_16', N'instance', N'inst_mvovcldjxd9g3w', N'inst_inst_mvovcldjxd9g3w_0.jpg', N'/media/zdjecia/inst_inst_mvovcldjxd9g3w_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_17', N'instance', N'inst_mvovcldox39kmm', N'inst_inst_mvovcldox39kmm_0.jpg', N'/media/zdjecia/inst_inst_mvovcldox39kmm_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_18', N'instance', N'inst_mvovcldtbouyxu', N'inst_inst_mvovcldtbouyxu_0.jpg', N'/media/zdjecia/inst_inst_mvovcldtbouyxu_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_19', N'instance', N'inst_mvovcldzelyjva', N'inst_inst_mvovcldzelyjva_0.jpg', N'/media/zdjecia/inst_inst_mvovcldzelyjva_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_20', N'instance', N'inst_mvovclebb4near', N'inst_inst_mvovclebb4near_0.jpg', N'/media/zdjecia/inst_inst_mvovclebb4near_0.jpg', 0);
INSERT INTO dbo.Photos (Id, OwnerType, OwnerId, FileName, Url, SortOrder) VALUES (N'photo_inst_21', N'instance', N'inst_mvovcleg7dfgsa', N'inst_inst_mvovcleg7dfgsa_0.jpg', N'/media/zdjecia/inst_inst_mvovcleg7dfgsa_0.jpg', 0);
GO