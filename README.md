# Baza wiedzy produkcyjnej

Aplikacja do gromadzenia wiedzy produkcyjnej: działy, elementy, instancje, informacje, procesy, uwagi technologiczne, grupy informacji z tabelami z Excela oraz odnośniki.

Wersja serwerowa: frontend w `public/`, API w `server/`, dane w Microsoft SQL Server oraz w folderach plików.

## Uruchomienie

Wymagany Node.js 18 lub nowszy.

```bash
copy .env.example .env
npm install
npm run seed
npm start
```

Aplikacja: [http://localhost:3000](http://localhost:3000)

`npm run seed` wczytuje `baza-wiedzy-produkcyjnej-kopia-2026-10-23.json`, zapisuje zdjęcia i tabele do folderów oraz tworzy `schema/seed.sql` i `data/state.json`.

### Microsoft SQL Server

1. W SSMS uruchom [`schema/schema.sql`](schema/schema.sql) — tworzy bazę `BazaWiedzyProdukcyjnej` i tabele.
2. Uzupełnij `.env` (`MSSQL_ENABLED=true` oraz dane logowania).
3. Uruchom `npm run seed` albo w SSMS plik [`schema/seed.sql`](schema/seed.sql).
4. `npm start`

Jeśli MSSQL jest wyłączony albo chwilowo niedostępny, serwer zapisuje to w `logs/error.log` i pracuje na pliku `data/state.json`. Po konfiguracji bazy wystarczy ponownie uruchomić seed i serwer.

Wszystkie pliki są zapisywane **względnie od folderu bazowego** aplikacji (katalog z `package.json`), a nie pod sztywną ścieżką konkretnego komputera:

| Folder | Domyślna nazwa |
|---|---|
| Zdjęcia | `Zdjęcia/` |
| Załączniki | `Załączniki/` |
| Tabele | `tabele/` |
| Logi | `logs/` |
| Stan JSON | `data/` |

Inny katalog bazowy ustawiasz w `.env` przez `APP_ROOT`. Nazwy podfolderów: `PHOTOS_DIR`, `ATTACHMENTS_DIR`, `TABLES_DIR`. W bazie i w interfejsie zostają tylko adresy względne, np. `/media/zdjecia/plik.jpg`.

## Struktura

```
public/          interfejs (HTML, CSS, JS)
server/          API Express, logi, połączenie z MSSQL
schema/          schemat i zasilenie bazy
tabele/          pliki tabel (JSON + oryginalny Excel)
Zdjęcia/         zdjęcia działów, elementów, instancji i informacji
Załączniki/      załączniki elementów i instancji
logs/            app.log, error.log, access.log
data/            zapasowy stan JSON, gdy MSSQL nie jest dostępny
```

## API

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/api/health` | status serwera i używany magazyn |
| GET | `/api/state` | cały stan do wyświetlenia |
| PUT | `/api/state` | zapis metadanych (działy, elementy, uwagi…) |
| POST | `/api/import` | import kopii JSON |
| POST | `/api/photos` | dodanie zdjęcia |
| PUT/DELETE | `/api/photos/:kind/:id` | lista / usunięcie zdjęć |
| POST | `/api/attachments` | dodanie załącznika |
| PUT/DELETE | `/api/attachments/:kind/:id` | lista / usunięcie załączników |
| POST | `/api/tables` | nowa tabela + plik Excel w `tabele/` |
| PUT/DELETE | `/api/tables/:id` | edycja / usunięcie tabeli |

`kind` to `element` albo `instance`.

## Jak działa aplikacja

Górny pasek: wyszukiwarka, **Eksportuj kopię**, **Importuj kopię**. Dwie zakładki:

- **Działy produkcyjne** — dział → element → instancja
- **Informacje Technologiczne** — grupy informacji i tabele

Usuwanie działu, elementu i grupy jest w widoku szczegółów (nie na kafelku), zawsze z potwierdzeniem.

### Tabele

Przy dodawaniu tabeli program zapisuje oryginalny Excel oraz JSON z wartościami, scaleniami i nagłówkiem w folderze `tabele/`. Widok i edycja komórek korzystają z tego pliku JSON. Ponowny import Excela jest potrzebny tylko przy zmianie struktury.

### Zdjęcia i załączniki

Nowe pliki trafiają do `Zdjęcia/` i `Załączniki/`. W bazie zostaje ścieżka, a interfejs pobiera plik z dysku serwera.

### Logi

Każdy błąd API, wyjątek procesu i nieudane połączenie z bazą jest dopisywany do `logs/error.log`. Ruch HTTP jest w `logs/access.log`.

## Kopia zapasowa

Eksport i import JSON działają jak wcześniej. Import zastępuje całą bazę na serwerze. Zdjęcia i załączniki z pliku kopii są rozpakowywane do folderów.

## Ograniczenia (bez zmian)

- Wyszukiwarka: nazwa elementu/instancji, Index, WinKlima, Skrót
- Tabele: maks. 300×40, pierwszy arkusz, bez formatowania; struktury nie edytuje się po dodaniu
- Zdjęcia są kompresowane przy wgrywaniu
- Panel boczny odnośników jest tylko do odczytu
