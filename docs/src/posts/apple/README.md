---
title: How to update Airflow
icon: logos:airflow-icon
date: 2023-10-08
category:
  - Apple
tag:
  - red
  - big
  - round
  - series
star: true
sticky: true
---

How to update Airflow

<!-- more -->

```python
import meilisearch

from common import MEILISEARCH_API_KEY, MEILISEARCH_URL


def main():
    client = meilisearch.Client(url=MEILISEARCH_URL, api_key=MEILISEARCH_API_KEY)
    resp = client.index('addresses').get_sortable_attributes()
    print(resp.json())


if __name__ == "__main__":
    main()

```
