import {
  Center,
  Group,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    cursor: "pointer",
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface ThProps {
  children?: React.ReactNode;
  title?: boolean;
  reversed?: boolean;
  sorted?: boolean;
  onSort?: () => void;
}

export const Th = ({
  children,
  title = true,
  reversed,
  sorted,
  onSort,
}: ThProps) => {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton
        onClick={title ? onSort : undefined}
        className={classes.control}
      >
        <Group position="left">
          <Text fw={700} fz="sm">
            {children}
          </Text>
          {title && (
            <Center className={classes.icon}>
              <Icon size="0.9rem" stroke={3} color="white" />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
};
