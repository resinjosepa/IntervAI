class AIService:
    def generate_question(
        self,
        role: str,
        difficulty: str,
        question_number: int,
    ) -> str:
        raise NotImplementedError(
            "AI question generation will be connected during integration."
        )
