class Context:
    def __init__(self, env, parent) -> None:
        self.env = {}
        self.parent = None
        if env:
            self.env = env
        self.parent = parent

    def get(self, key):
        if key in self.env:
            return self.env[key]
        if self.parent:
            return self.parent.get(key)
        return None

    def set(self, key, value) -> None:
        self.env[key] = value
