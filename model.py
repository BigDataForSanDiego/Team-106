from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from dataset import * 

class SymptomCheckerModel():
    def __init__(self):
        self.model = LogisticRegression()

    def fit(self, reg_irreg):
        X = reg_irreg.iloc[:, :-1]
        y = reg_irreg['Irregular']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
        self.model.fit(X_train, y_train)
        return self.model, self.model.score(X_test, y_test)

    def predict(self, x, thresh=0.4):
        result = self.model.predict_proba(x)
        irregular = result[:, 1] > thresh
        return result, irregular

