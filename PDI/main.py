import numpy as np
import cv2

path = r'img\original.jpeg'

img = cv2.imread(path)

# ==== informações importantes da imagem =========
print('Tamanha da imagem (linhas, colunas), ', img.shape)
#  Media das intensidades
print('Media das intensidades: ', img.mean())
#  Intensidades minimas e maximas
print('Intensidade minima:', img.min(), '. Intensidade maxima: ', img.max())

# *===================================================================
# ============= Fundamentos de imagens digitais ========= 2/3
# *ilustração dos efeitos de amostragem e quantização (F)
# *operações aritmeticas sobre imagens (F)
# *operaçoes logicas sobre imagens (F)
# mascara
mascara = np.ones((5, 5), np.uint8)

# ============ Transformações de intensidade ========== 2/8
# *Negativo de uma imagem (F)
# *Transformação gama (F)
# *Alargamento de contraste (F)
# *Fatiamento de niveis de intensidade (M)
# *Construção de histogramas (F)
# *Equalização de histogramas (F)
# *Especificação de histograma (D)
# *Equalização local de histograma (M)

# ============= Filtragem espacial para suavisação ===== 2/5
# *Filtro de média (F)

# *filtro de média ponderada (M)
# *filtro gaussiano (F)
# *filtro da mediana (F)
# *filtro de maximo e minimo (F)

# ============= Filtragem espacial para aguçamento === 2/3
# * Laplacino (F)
# img = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
# * Mascara de nitidez e high-boost (M)
# * Gradiente (F)

# ============= Segmentação - detecção de bordas ======= 2/3
# * Efeitos da suavização da detecção de bordas (M)
# * Efeitos da limiarização na detecção de bordas (M)
# * Ligação de bordas e detecção de fronteiras (D)

# ============= Segmentação - limiarização ============ 2/3
# * Limiarização interativa (M)
# * Limiarização utilizando o metodo de Otsu (M)
# * Efeito da suavização na limiarização (D)
# * Usando bordas para melhorar a limiarização (D)
# * Limiarização local (D)
# lim1 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY, 11, 2)
# lim2 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY, 11, 2)
# limLocal = lim1 + lim2


# cv2.imshow("limiarização local", limLocal)

# Erosao
erosao = cv2.erode(img, mascara, iterations=1)
cv2.imshow("erosao", erosao)

# Dilatacao
dilatacao = cv2.dilate(img, mascara, iterations=2)
cv2.imshow("dilatacao", dilatacao)

# Abertura
abertura = cv2.morphologyEx(img, cv2.MORPH_OPEN, mascara)
cv2.imshow("abertura", abertura)

# Fechamento
fechamento = cv2.morphologyEx(img, cv2.MORPH_CLOSE, mascara)
cv2.imshow("fechamento", fechamento)

cv2.imshow("original", img)

cv2.waitKey(0)
cv2.destroyAllWindows()


