from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UI_MAP = {
    "/": {
        "title": "Home",
        "components": [
            {
                "type": "text",
                "content": "Welcome to the Home Page",
                "props": {"style": {"fontSize": 24, "fontFamily": "Arial"}},
            },
            {"type": "text", "content": "Welcome to the Home Page"},
            {
                "type": "container",
                "props": {"style": {"flexDirection": "column"}},
                "children": [
                    {"type": "text", "content": "This is inside a container"},
                    {"type": "text", "content": "This is inside a container"},
                ],
            },
        ],
    },
    "/about": {
        "title": "About",
        "components": [{"type": "text", "content": "This is the About Page"}],
    },
    "/not-found": {
        "title": "Not Found",
        "components": [{"type": "text", "content": "404 - Page Not Found"}],
    },
}


@app.get("/api/ui")
def read_root(path: str):
    if not path:
        raise HTTPException(
            status_code=400, detail="Query parameter 'path' is required"
        )

    if path[-1] == "/" and path != "/":
        path = path[:-1]

    if path not in UI_MAP:
        path = "/not-found"

    return UI_MAP.get(path)
