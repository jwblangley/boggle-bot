out = open("./output.json", 'w')

out.write("[")

with open('./words.txt') as fp:
    for line in fp:
        out.write("\t\"" + line.replace("\n", "") + "\",\n")

out.write("]")
out.close()
