/*
  Baza wiedzy produkcyjnej — schemat Microsoft SQL Server
  ========================================================
  1. Uruchom ten plik w SQL Server Management Studio (lub sqlcmd) jako administrator.
  2. Następnie uruchom schema/seed.sql albo: npm run seed
     Skrypt seed zapisze też zdjęcia, załączniki i tabele do folderów aplikacji.
*/

IF DB_ID(N'BazaWiedzyProdukcyjnej') IS NULL
BEGIN
  CREATE DATABASE [BazaWiedzyProdukcyjnej];
END
GO

USE [BazaWiedzyProdukcyjnej];
GO

IF OBJECT_ID(N'dbo.NoteLinks', N'U') IS NOT NULL DROP TABLE dbo.NoteLinks;
IF OBJECT_ID(N'dbo.Notes', N'U') IS NOT NULL DROP TABLE dbo.Notes;
IF OBJECT_ID(N'dbo.InstanceInformations', N'U') IS NOT NULL DROP TABLE dbo.InstanceInformations;
IF OBJECT_ID(N'dbo.ElementInformations', N'U') IS NOT NULL DROP TABLE dbo.ElementInformations;
IF OBJECT_ID(N'dbo.Attachments', N'U') IS NOT NULL DROP TABLE dbo.Attachments;
IF OBJECT_ID(N'dbo.Photos', N'U') IS NOT NULL DROP TABLE dbo.Photos;
IF OBJECT_ID(N'dbo.TechTables', N'U') IS NOT NULL DROP TABLE dbo.TechTables;
IF OBJECT_ID(N'dbo.TechInfos', N'U') IS NOT NULL DROP TABLE dbo.TechInfos;
IF OBJECT_ID(N'dbo.Instances', N'U') IS NOT NULL DROP TABLE dbo.Instances;
IF OBJECT_ID(N'dbo.Elements', N'U') IS NOT NULL DROP TABLE dbo.Elements;
IF OBJECT_ID(N'dbo.Departments', N'U') IS NOT NULL DROP TABLE dbo.Departments;
IF OBJECT_ID(N'dbo.TechGroups', N'U') IS NOT NULL DROP TABLE dbo.TechGroups;
GO

CREATE TABLE dbo.Departments (
  Id         NVARCHAR(64)  NOT NULL PRIMARY KEY,
  Name       NVARCHAR(500) NOT NULL,
  PhotoPath  NVARCHAR(1000) NULL,
  SortOrder  INT           NOT NULL CONSTRAINT DF_Departments_Sort DEFAULT (0)
);

CREATE TABLE dbo.Elements (
  Id           NVARCHAR(64)  NOT NULL PRIMARY KEY,
  DepartmentId NVARCHAR(64)  NOT NULL,
  Name         NVARCHAR(500) NOT NULL,
  SortOrder    INT           NOT NULL CONSTRAINT DF_Elements_Sort DEFAULT (0),
  CONSTRAINT FK_Elements_Departments FOREIGN KEY (DepartmentId)
    REFERENCES dbo.Departments (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.Instances (
  Id         NVARCHAR(64)  NOT NULL PRIMARY KEY,
  ElementId  NVARCHAR(64)  NOT NULL,
  Name       NVARCHAR(500) NOT NULL,
  IndexCode  NVARCHAR(200) NULL,
  WinKlima   NVARCHAR(200) NULL,
  Skrot      NVARCHAR(200) NULL,
  SortOrder  INT           NOT NULL CONSTRAINT DF_Instances_Sort DEFAULT (0),
  CONSTRAINT FK_Instances_Elements FOREIGN KEY (ElementId)
    REFERENCES dbo.Elements (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.ElementInformations (
  Id          NVARCHAR(64)   NOT NULL PRIMARY KEY,
  ElementId   NVARCHAR(64)   NOT NULL,
  Name        NVARCHAR(500)  NOT NULL,
  Description NVARCHAR(MAX)  NULL,
  Optional    BIT            NOT NULL CONSTRAINT DF_ElInfo_Optional DEFAULT (0),
  SortOrder   INT            NOT NULL CONSTRAINT DF_ElInfo_Sort DEFAULT (0),
  CONSTRAINT FK_ElInfo_Elements FOREIGN KEY (ElementId)
    REFERENCES dbo.Elements (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.InstanceInformations (
  Id          NVARCHAR(64)   NOT NULL PRIMARY KEY,
  InstanceId  NVARCHAR(64)   NOT NULL,
  Name        NVARCHAR(500)  NOT NULL,
  Description NVARCHAR(MAX)  NULL,
  Optional    BIT            NOT NULL CONSTRAINT DF_InstInfo_Optional DEFAULT (0),
  Type        NVARCHAR(20)   NOT NULL CONSTRAINT DF_InstInfo_Type DEFAULT (N'info'),
  PhotoPath   NVARCHAR(1000) NULL,
  SortOrder   INT            NOT NULL CONSTRAINT DF_InstInfo_Sort DEFAULT (0),
  CONSTRAINT FK_InstInfo_Instances FOREIGN KEY (InstanceId)
    REFERENCES dbo.Instances (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.Notes (
  Id          NVARCHAR(64)  NOT NULL PRIMARY KEY,
  Scope       NVARCHAR(20)  NOT NULL, -- element | instance
  OwnerId     NVARCHAR(64)  NOT NULL,
  Kind        NVARCHAR(20)  NOT NULL, -- general | creation | instruction
  Name        NVARCHAR(500) NULL,
  Description NVARCHAR(MAX) NULL,
  Diameter    FLOAT         NULL,
  Client      NVARCHAR(500) NULL,
  Za          NVARCHAR(200) NULL,
  DateUtc     DATETIME2     NULL,
  SortOrder   INT           NOT NULL CONSTRAINT DF_Notes_Sort DEFAULT (0)
);

CREATE TABLE dbo.NoteLinks (
  NoteId     NVARCHAR(64) NOT NULL,
  TargetType NVARCHAR(20) NOT NULL, -- department | element | instance | techgroup
  TargetId   NVARCHAR(64) NOT NULL,
  SortOrder  INT          NOT NULL CONSTRAINT DF_NoteLinks_Sort DEFAULT (0),
  CONSTRAINT FK_NoteLinks_Notes FOREIGN KEY (NoteId)
    REFERENCES dbo.Notes (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.TechGroups (
  Id        NVARCHAR(64)  NOT NULL PRIMARY KEY,
  Name      NVARCHAR(500) NOT NULL,
  SortOrder INT           NOT NULL CONSTRAINT DF_TechGroups_Sort DEFAULT (0)
);

CREATE TABLE dbo.TechInfos (
  Id          NVARCHAR(64)  NOT NULL PRIMARY KEY,
  GroupId     NVARCHAR(64)  NOT NULL,
  Name        NVARCHAR(500) NOT NULL,
  Description NVARCHAR(MAX) NULL,
  Optional    BIT           NOT NULL CONSTRAINT DF_TechInfos_Optional DEFAULT (0),
  SortOrder   INT           NOT NULL CONSTRAINT DF_TechInfos_Sort DEFAULT (0),
  CONSTRAINT FK_TechInfos_Groups FOREIGN KEY (GroupId)
    REFERENCES dbo.TechGroups (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.TechTables (
  Id             NVARCHAR(64)  NOT NULL PRIMARY KEY,
  GroupId        NVARCHAR(64)  NOT NULL,
  Name           NVARCHAR(500) NOT NULL,
  DateUtc        DATETIME2     NULL,
  SourceFileName NVARCHAR(500) NULL, -- oryginalny Excel w folderze tabele
  DataFileName   NVARCHAR(500) NOT NULL, -- JSON z wartościami w folderze tabele
  SortOrder      INT           NOT NULL CONSTRAINT DF_TechTables_Sort DEFAULT (0),
  CONSTRAINT FK_TechTables_Groups FOREIGN KEY (GroupId)
    REFERENCES dbo.TechGroups (Id) ON DELETE CASCADE
);

CREATE TABLE dbo.Photos (
  Id        NVARCHAR(64)   NOT NULL PRIMARY KEY,
  OwnerType NVARCHAR(20)   NOT NULL, -- element | instance
  OwnerId   NVARCHAR(64)   NOT NULL,
  FileName  NVARCHAR(500)  NOT NULL,
  Url       NVARCHAR(1000) NOT NULL,
  SortOrder INT            NOT NULL CONSTRAINT DF_Photos_Sort DEFAULT (0)
);

CREATE TABLE dbo.Attachments (
  Id           NVARCHAR(64)   NOT NULL PRIMARY KEY,
  OwnerType    NVARCHAR(20)   NOT NULL, -- element | instance
  OwnerId      NVARCHAR(64)   NOT NULL,
  OriginalName NVARCHAR(500)  NOT NULL,
  FileName     NVARCHAR(500)  NOT NULL,
  Url          NVARCHAR(1000) NOT NULL,
  MimeType     NVARCHAR(200)  NULL,
  SizeBytes    BIGINT         NOT NULL CONSTRAINT DF_Att_Size DEFAULT (0),
  SortOrder    INT            NOT NULL CONSTRAINT DF_Att_Sort DEFAULT (0)
);

CREATE INDEX IX_Elements_Department ON dbo.Elements (DepartmentId);
CREATE INDEX IX_Instances_Element ON dbo.Instances (ElementId);
CREATE INDEX IX_Notes_Owner ON dbo.Notes (Scope, OwnerId);
CREATE INDEX IX_Photos_Owner ON dbo.Photos (OwnerType, OwnerId);
CREATE INDEX IX_Attachments_Owner ON dbo.Attachments (OwnerType, OwnerId);
CREATE INDEX IX_TechInfos_Group ON dbo.TechInfos (GroupId);
CREATE INDEX IX_TechTables_Group ON dbo.TechTables (GroupId);
GO
