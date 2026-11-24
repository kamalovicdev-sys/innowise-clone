# Sohalar rasmlari

Fayl nomi soha id'si bilan bir xil bo'lishi kerak (`src/data/sections.js` → `INDUSTRIES`):

- `fmcg.jpg`
- `distribution.jpg`
- `ecommerce.jpg`
- `manufacturing.jpg`
- `horeca.jpg`
- `logistics.jpg`

Gorizontal rasm qo'ying (3:2, kengligi kamida 1200 px). Build vaqtida ular 480, 800 va 1200 px WebP'ga aylantiriladi.

Rasmlar faqat **oltitasi ham** qo'yilgandagina saytda chiqadi. Bittasi yetishmasa, barcha sohalarda bir xil uslubdagi ikonkali panel ko'rsatiladi, shuning uchun sahifa chala ko'rinmaydi.

Eski saytdagi chakana savdo va logistika rasmlari git tarixida saqlangan:

```bash
git show 21d0dc7:src/assets/portfolio/retail.jpg > src/assets/industries/fmcg.jpg
git show 21d0dc7:src/assets/portfolio/logistics.jpg > src/assets/industries/logistics.jpg
```
